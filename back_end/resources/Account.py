import traceback, json
from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
from common.util import hash_password
from models.model import User as User_Model


# An example of request body payload data structure.
# {
#     "name" : "Postman6",
#     "email": "postman6@gmail.com",
#     "password": "asdf654",
#     "user_level": 1,
#     "phone_number": "=60169157190"
#     "has_telegram": true
# }
class User(Resource):
    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        parser.add_argument('password')
        parser.add_argument('email', required=True)
        parser.add_argument('user_level')
        parser.add_argument('phone_number', required=True)
        parser.add_argument('has_telegram')
        args = parser.parse_args()

        try:
            # Check whether user already register.
            existing_user = User_Model.find_by_email(args['email'])
            if existing_user:
                return {'message': 'User with the email address: {} has registered before.'.format(existing_user.email_address)}, 400

            # Else if user not exist in database, create new user.
            else:
                new_user = User_Model(name = args['name'], email_address = args['email'], user_level = args['user_level'], password_hash = hash_password(args['password']), phone_number = args['phone_number'], has_telegram = bool(args['has_telegram']))
                
            new_user.save()
            return "A new user is registered.", 201

        except:
            print(traceback.format_exc())
            return {'message': 'An error occurred. Check console for error message.'}, 400

    @jwt_required
    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        parser.add_argument('password')
        parser.add_argument('email')
        parser.add_argument('user_level')
        parser.add_argument('phone_number')
        parser.add_argument('has_telegram')        
        args = parser.parse_args()

        try:
            # Check if the user whom request for update is already exist in the database.
            existing_user = User_Model.find_by_email(args['email'])
            
            if existing_user != None:
                # Update existing user details.
                existing_user.name = args['name']
                existing_user.user_level = args['user_level']
                existing_user.user_level = args['phone_number']
                existing_user.user_level = args['has_telegram']
                existing_user.password_hash = hash_password(args['password'])
                
                # !! Need to commit the changes after update
                User_Model.update()
                return {'message': 'User with email {}\'s details have been updated.'.format(existing_user.email_address)}, 200

            else:
                return {'message': 'This user does not exist in database.'}
        
        except:
            print(traceback.format_exc())
            return {'message': 'An error occurred. Check console for error message.'}, 400

    @jwt_required
    def get(self):
        email = request.args.get('email')
        print(email)

        try:
            existing_user = User_Model.find_by_email(email)
            if not existing_user:
                return {'message': 'This user is not found in the database.'}, 400
            
            else:
                user_details = json.loads(json.dumps({'name': existing_user.name, 'email_address': existing_user.email_address, 'user_level': existing_user.user_level, 'phone_number': existing_user.phone_number, 'has_telegram': existing_user.has_telegram}))
                return {'message': 'Found user.', 'user_details': user_details}, 200
        except:
            print(traceback.format_exc())
            return {'message': 'An error occurred. Check console for error message.'}, 400
                

