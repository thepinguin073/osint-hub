#===========================================================+
#      Additionnal function for backend
#===========================================================+

MODE = 'PROD' # DEBUG or PROD

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
		return e