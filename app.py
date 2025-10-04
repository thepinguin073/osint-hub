from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import socket
import os

app = Flask(__name__, static_folder='frontend/static', template_folder='frontend')
CORS(app, origins=["http://127.0.0.1:*", "http://localhost:*"], supports_credentials=True)


# =========================
# Port checker
# =========================

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
#      Routes
#===========================================================+

@app.route('/index.html')
@app.route('/index')
@app.route('/')
def index():
    return send_from_directory('frontend', 'index.html')

@app.route('/osint-hub')
def osint():
    return send_from_directory('frontend', 'osint.html')

@app.route('/offsec-hub')
def offsec():
    return send_from_directory('frontend', 'offsec.html')

@app.route('/soon')
def soon():
    return send_from_directory('frontend', 'soon.html')

@app.route('/api/tools')
def get_tools():
    return send_from_directory('api', 'tools.json', mimetype='application/json')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('frontend/static', 'favicon.ico')


# =========================
# Run app
# =========================

if __name__ == "__main__":
    app.run(port=port, debug=False)
    print(f'* Running on http://127.0.0.1:{port}')