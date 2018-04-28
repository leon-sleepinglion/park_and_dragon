from passlib.hash import pbkdf2_sha256
import string, random


def hash_password(password):
    return pbkdf2_sha256.hash(password)


def verify_password(password, hash):
    return pbkdf2_sha256.verify(password, hash)

def code_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))