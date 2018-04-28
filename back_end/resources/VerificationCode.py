import traceback, json
from flask import request
from flask_restful import Resource, reqparse
from models.model import VerificationCodeModel as VCode
from common.util import code_generator

# Get a string of code for user.
class GenerateCode(Resource):
    def get(self):
        try:
            new_code = code_generator()
            new_record = VCode(generated_code=new_code)
            new_record.save()
            return {"message" : "Code generated." , "code": new_code}, 200

        except:
            print(traceback.format_exc())
            return {'message': 'An error occurred. Check console for error message.'}, 400


class ApplyCode(Resource):
    def get(self):
        code = request.args.get('code')

        try:
            existing_code = VCode.find_code(code)
            if existing_code != None:
                existing_code.is_used = True
                VCode.commit()
                return {'message':'User applied the code.'}, 200
        except:
            print(traceback.format_exc())
            return {'message': 'An error occurred. Check console for error message.'}, 400

