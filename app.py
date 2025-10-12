#===========================================================+
#      INIT
#===========================================================+

from flask import Flask, send_from_directory, request, abort, g
from flask_cors import CORS
import socket
import bleach

app = Flask(__name__, static_folder='frontend/static', template_folder='frontend')
CORS(app, origins=["http://127.0.0.1:*", "http://localhost:*"], supports_credentials=True)


#===========================================================+
#      PORT CHECKER
#===========================================================+

def find_free_port(start=8000, end=9000):
    for port in range(start, end):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("localhost", port))
                return port
            except OSError:
                continue
    raise RuntimeError("No free port found in range")

port = find_free_port()


#===========================================================+
#      MIDDLEWARE
#===========================================================+

from flask import request, abort, g
import bleach

@app.before_request
def security_middleware():
    if request.method not in ["GET", "POST"]:
        abort(405)

    if request.content_type and ("text" in request.content_type or "html" in request.content_type):
        raw = request.get_data(as_text=True)
        g.sanitized_input = bleach.clean(raw)
    else:
        g.sanitized_input = None


@app.after_request
def add_security_headers(response):
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
    response.headers["Cross-Origin-Resource-Policy"] = "same-origin"
    response.headers["Server"] = "SecureApp"
    return response

#===========================================================+
#--------------------GET Methods-----------------------------
#===========================================================+

@app.route('/index.html')
@app.route('/index')
@app.route('/')
def index():
    return send_from_directory('frontend', 'index.html')


#===========================================================+
#      HUB
#===========================================================+

@app.route('/osint-hub')
def osint():
    return send_from_directory('frontend', 'osint.html')

@app.route('/offsec-hub')
def offsec():
    return send_from_directory('frontend', 'offsec.html')


#===========================================================+
#      REPORT GENERATOR
#===========================================================+

@app.route('/reports-generator')
def reports_generator():
    return send_from_directory('frontend', 'reports-generator.html')

@app.route('/pentest-report')
def pentest_report():
    return send_from_directory('frontend', 'pentest-report.html')

@app.route('/osint-classic')
def osint_classic():
    return send_from_directory('frontend', 'osint-classic.html')

@app.route('/threat-int')
def digital_footprint():
    return send_from_directory('frontend', 'threat-int.html')


#===========================================================+
#      API
#===========================================================+

@app.route('/api/tools')
def get_tools():
    return send_from_directory('api', 'tools.json', mimetype='application/json')

@app.route('/api/offsec-tools')
def get_offsec_tools():
    return send_from_directory('api', 'offsec_tools.json', mimetype='application/json')


#===========================================================+
#      OTHER
#===========================================================+

@app.errorhandler(404)
def not_found(error):
    return send_from_directory('frontend', '404.html'), 404

@app.route('/soon')
def soon():
    return send_from_directory('frontend', 'soon.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('frontend/static', 'favicon.ico')


#===========================================================+
#-----------------------POST Method-------------------------
#===========================================================+

@app.route('/api/report/osint-classic', methods=['POST'])
def generate_osint_classic():
    content_type = request.headers.get('Content-Type')
    if content_type and content_type != 'application/json':
        abort(400, "Error: Bad MIME Type")
    else:
        data = request.get_json(silent=True)
        return data

@app.route('/api/report/pentest', methods=['POST'])
def generate_pentest():
    content_type = request.headers.get('Content-Type')
    if content_type and content_type != 'application/json':
        abort(400, "Error: Bad MIME Type")
    else:
        data = request.get_json(silent=True)
        return data

@app.route('/api/report/threat-intelligence', methods=['POST'])
def generate_threat_int():
    content_type = request.headers.get('Content-Type')
    if content_type and content_type != 'application/json':
        abort(400, "Error: Bad MIME Type")
    else:
        data = request.get_json(silent=True)
        return data


#===========================================================+
#      RUN APP
#===========================================================+

if __name__ == "__main__":
    app.run(port=port, debug=True)