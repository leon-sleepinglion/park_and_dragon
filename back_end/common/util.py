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
		"recipient" : recipient,
		"type": "telegram",
		"issuer": "Park and Dragon"
	}

	r = requests.post(url, data=json.dumps(data), headers=headers, auth=HTTPBasicAuth('twizo', 'l0DczJDRfdcjUBFw9Nc6K2BXBk4pT9Fpt59BaOIfankw27-N'))
	# print(json.loads(r.text)['messageId'])
	return json.loads(r.text)['messageId']

def twizo_verify(messageId):
	url = "https://api-asia-01.twizo.com/verification/submit/" + messageId
	headers = {
		"Accept": "application/json",
		"Content-Type": "application/json; charset=utf8"
	}

	r = requests.get(url, headers=headers, auth=HTTPBasicAuth('twizo', 'l0DczJDRfdcjUBFw9Nc6K2BXBk4pT9Fpt59BaOIfankw27-N'))
	# print(json.loads(r.text)['statusCode'])
	return json.loads(r.text)['statusCode']

def code_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))
