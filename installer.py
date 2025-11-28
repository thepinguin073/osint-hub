import os
import socket
import sys	
import subprocess
from subprocess import PIPE


def create_venv(venv_path="venv"):
	if not os.path.exists(venv_path):
		print("[+] Creating virtual environment ...")
		try:
			subprocess.run([sys.executable, "-m", "venv", venv_path], check=True)
			print(f"[+] Virtual environment created at {venv_path}")
		except subprocess.CalledProcessError as e:
			print(f"[-] ERROR: Could not create virtual environment: {e}")
			return 1
	else:
		print(f"[+] Virtual environment already exists at {venv_path}")
	return 0


def check_internet(host="8.8.8.8", port=53, timeout=3):
	try:
		socket.setdefaulttimeout(timeout)
		sock = socket.create_connection((host, port))
		sock.close()
		return True
	except OSError as e:
		print(f'[-] ERROR : {e}')
		return False


def install_dependencies_in_venv(venv_path="venv"):
	pip_path = os.path.join(venv_path, "bin", "pip")							# Linux/macOS
	if not os.path.exists(pip_path):
		pip_path = os.path.join(venv_path, "Scripts", "pip.exe")				# Windows

	try:
		print("[+] Installing dependencies in virtual environment ...")
		subprocess.run([pip_path, "install", "-r", "requirements.txt"], check=True)
		print("[+] Dependencies installed successfully in venv")
		return 0
	except subprocess.CalledProcessError:
		print("[-] ERROR: Could not install dependencies in venv")
		return 1


def install_ai_model():
	try:
		print('[+] Installing AI Model ...')
		subprocess.run([
			'wget',
			'https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf/resolve/main/Phi-3-mini-4k-instruct-q4.gguf',
			'-O',
			'models/phi3-mini.gguf'
		], check=True)
		print("[+] AI model successfully installed")
		return 0
	except subprocess.CalledProcessError:
		print("[-] ERROR : Please install AI model manually with wget ...")
		return 1


def main():
	try:
		directory_path = os.path.dirname(os.path.abspath(__file__))
		models_path = os.path.join(directory_path, "models")
		if not os.path.exists(models_path):
			os.makedirs(models_path)

		if not check_internet():
			print('[-] Please check your internet connection ...')
			return 1

		if create_venv() != 0:
			return 1

		if install_dependencies_in_venv() != 0:
			return 1

		if install_ai_model() != 0:
			return 1

		print('=' * 100)
		print(f'INSTALLATION COMPLETE\nIf you close the terminal, you need to navigate to {directory_path} and run this command :')
		print('source ./venv/bin/activate # Linux')
		print('venv\\Scripts\\activate.bat # Windows')
		print('=' * 100)
		return 0

	except KeyboardInterrupt:
		print('\nBye !')


if __name__ == '__main__':
	main()