import traceback, json
from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
from models.model import VerificationCodeModel as VCode
from models.model import User
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
    @jwt_required
    def get(self):
        code = request.args.get('code')
        email = get_jwt_identity()
        try:
            existing_code = VCode.find_code(code)
            if existing_code != None:
                if existing_code.is_used != True:
                    existing_code.is_used = True
                    user = User.find_by_email(email)
                    user.point = user.point + 25
                    VCode.commit()
                    return {'message':'User applied the code.'}, 200
                else:
                    return {'message': 'This code has been applied before. Please try another one.'}, 200
            return {'message': 'Invalid code.'}
        except:
            print(traceback.format_exc())
            return {'message': 'An error occurred. Check console for error message.'}, 400

