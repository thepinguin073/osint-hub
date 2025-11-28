#===========================================================+
#      Additionnal function for backend
#===========================================================+
import markdown
from weasyprint import HTML, CSS
from llama_cpp import Llama
import os
import re

os.environ["OMP_NUM_THREADS"] = "4" 
os.environ["MKL_NUM_THREADS"] = "4"
MODE = 'PROD' # DEBUG or PROD

#===========================================================+
#      Repport Generator
#===========================================================+


def listing_keys(python_dict, level=0, mode=MODE, keys=None, subkeys=None):
	if keys is None:
		keys = []
	if subkeys is None:
		subkeys = []

	try:
		if not python_dict or not isinstance(python_dict, dict):
			raise ValueError('Bad Value, need python dictionnary')
		else:
			if isinstance(python_dict, dict):
				for key, value in python_dict.items():
					if mode == 'DEBUG':
						if level == 0:
							print("=" * 50)
							print(key.upper())
							print("=" * 50)

						else:
							print(f"\033[3m{key}\033[0m")
						listing_keys(value, level + 1, mode, keys, subkeys)

					if mode == 'PROD':
						if level == 0:
							keys.append((key, value))
						else:
							subkeys.append((key, value))
						listing_keys(value, level + 1, mode, keys, subkeys)

			elif isinstance(python_dict, list):
				for item in python_dict:
					listing_keys(item, level, mode, keys, subkeys)

		return keys, subkeys 

	except Exception as e:
		return None, e


def format_report(report_type, data_md):
	html_text = markdown.markdown(data_md, extensions=['fenced_code', 'codehilite'])

	html_doc = f"""
	<html>
		<head>
			<meta charset="utf-8">
		</head>
		<body>
			{html_text}
		</body>
	</html>
	"""

	css_path = f'./templates/{report_type}-report.css'
	pdf_name = f"{report_type}-report.pdf"
	pdf_bytes = HTML(string=html_doc).write_pdf(stylesheets=[CSS(filename=css_path)])

	return pdf_name, pdf_bytes


#===========================================================+
#      AI Model
#===========================================================+

class DocManager:
    def __init__(self, docs_path):
        with open(docs_path, 'r', encoding='utf-8') as f:
            full_text = f.read()
        
        self.chunks = []
        chunk_size = 500
        overlap = 100
        
        for i in range(0, len(full_text), chunk_size - overlap):
            chunk = full_text[i:i + chunk_size]
            self.chunks.append(chunk.lower())
        
        self.chunk_words = []
        for chunk in self.chunks:
            words = set(re.findall(r'\b\w{4,}\b', chunk))
            self.chunk_words.append(words)
            
        print(f"✓ Documentation loaded : {len(self.chunks)} chunks ready")
    
    
    def find_best_chunk(self, query, max_results=1):
        query_words = set(re.findall(r'\b\w{4,}\b', query.lower()))
        
        if not query_words:
            return self.chunks[0]
        
        scores = []
        for i, chunk_words in enumerate(self.chunk_words):
            score = len(query_words & chunk_words)
            if score > 0:
                scores.append((score, i))
        
        if not scores:
            return self.chunks[0]
        
        scores.sort(reverse=True)
        best_indices = [idx for _, idx in scores[:max_results]]
        
        result = '\n\n'.join([self.chunks[i] for i in best_indices])
        return result[:800]


def import_model():
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_dir, "models", "phi3-mini.gguf")
        
        print("#" * 100, '\n')
        print(f'Loading AI model from: {model_path}', '\n')
        print('#' * 100)
        
        if not os.path.exists(model_path):
            print(f"ERROR: Model file not found at {model_path}")
            return None, None
        
        llm = Llama(
            model_path=model_path,
            n_ctx=2048,
            n_threads=4,
            n_batch=256,
            n_gpu_layers=0,
            use_mlock=True,
            verbose=False,
        )
        
        docs_path = os.path.join(base_dir, "docs.md")
        doc_manager = DocManager(docs_path)
        
        print("✓ Model loaded successfully\n")
        return llm, doc_manager
    
    except Exception as e:
        print(f"ERROR loading model: {e}")
        return None, None

def ai_answer(llm, doc_manager, prompt):
    try:
        if llm is None or doc_manager is None:
            return "The AI model is not currently available."
        
        relevant_chunk = doc_manager.find_best_chunk(prompt, max_results=1)
        
        full_prompt = f"""DOC:
{relevant_chunk}

Q: {prompt}
A:"""
        
        res = llm(
            prompt=full_prompt,
            max_tokens=256,
            temperature=0.6,
            top_p=0.9,
            repeat_penalty=1.1,
            stop=["Q:", "QUESTION:", "DOC:"],
            echo=False
        )
        
        answer = res["choices"][0]["text"].strip()
        
        answer = answer.split('\n')[0]
        return answer[:300]
    
    except Exception as e:
        print(f"ERROR: {e}")
        return "Erreur lors du traitement."