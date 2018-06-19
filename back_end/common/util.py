import requests, json
from flask import request
from requests.auth import HTTPBasicAuth
from passlib.hash import pbkdf2_sha256
import string, random


def hash_password(password):
	return pbkdf2_sha256.hash(password)


def verify_password(password, hash):
	return pbkdf2_sha256.verify(password, hash)

def twizo_request(recipient):
	url = "https://api-asia-01.twizo.com/v1/verification/submit"

	headers = {
		"Accept": "application/json",
		"Content-Type": "application/json; charset=utf8"
	}

	data = {
		"recipient" : recipient
		# "type": "telegram",
		# "issuer": "Park and Dragon"
	}

	r = requests.post(url, data=json.dumps(data), headers=headers, auth=HTTPBasicAuth('twizo', 'otS3gV4v8PB9niI2ICxPsg6NrmHgwK4whd8gED3aelHQMayw'))
	# print(json.loads(r.text))
	return json.loads(r.text)['messageId']

def twizo_verify(messageId, token):
	url = "https://api-asia-01.twizo.com/verification/submit/" + messageId + "?token=" + token
	headers = {
		"Accept": "application/json",
		"Content-Type": "application/json; charset=utf8"
	}

	r = requests.get(url, headers=headers, auth=HTTPBasicAuth('twizo', 'otS3gV4v8PB9niI2ICxPsg6NrmHgwK4whd8gED3aelHQMayw'))
	# print(json.loads(r.text))
	return json.loads(r.text)['statusCode']

def code_generator(size=6, chars=string.ascii_uppercase + string.digits):
	return ''.join(random.choice(chars) for _ in range(size))

print(hash_password("WEE CHEE SAN"))