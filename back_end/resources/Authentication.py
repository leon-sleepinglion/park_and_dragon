import traceback, datetime, random, string, json
from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)

from common.util import verify_password, twizo_request, twizo_verify
from models.model import User, RevokedTokenModel
from db import secret

class UserLogin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('email')
    parser.add_argument('password')

    def post(self):
        args = UserLogin.parser.parse_args()
        try:
            current_user = User.find_by_email(args['email'])
            # search database for person with this email
            if not current_user:
                return {'message': 'User {} doesn\'t exist'.format(args['email'])}, 400

            if verify_password(args['password'], current_user.password_hash):
                # access_token = create_access_token([current_user.email_address, current_user.id], expires_delta=datetime.timedelta(hours=1))
                # refresh_token = create_refresh_token(identity=args['name'])
                # my_secret = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(32)])
                # secret.append(my_secret)
                # messageId = twizo_request(current_user.phone_number)
                # credentials = [messageId, current_user.email_address, current_user.id]
                # secret.append(messageId)
                access_token = create_access_token(args['email'], expires_delta=datetime.timedelta(hours=3))
                return {
                    'message': 'Logged in as {}'.format(current_user.email_address),
                    'access_token': access_token
                    # 'message': 'Passed first factor.',
                    # 'credentials': credentials
                }
            else:
                return {'message': 'Wrong credentials'}, 400
        except:
            print(traceback.format_exc())
            return {'message': 'An error occured'}, 400

class UserLogout(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {'message': 'Access token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500

# class TwoFactorAuth(Resource):
#     parser = reqparse.RequestParser()
#     parser.add_argument('messageId')
#     parser.add_argument('token')
#     parser.add_argument('email')
#
#     def post(self):
#         args = TwoFactorAuth.parser.parse_args()
#         try:
#             # print(secret)
#             # print(args['messageId'])
#             status = twizo_verify(args['messageId'], args['token'])
#             # print(args['messageId'] in secret)
#             # print(status)
#             if (status == 1 or status == '1') and args['messageId'] in secret:
#                 secret.remove(args['messageId'])
#                 # access_token = create_access_token(args['email'], expires_delta=datetime.timedelta(hours=3))
#                 return {
#                     # 'message': 'Logged in as {}'.format(args['email']),
#                     'access_token': access_token
#                 }
#             else:
#                 return {'message': 'Error logging in.'}, 400
#         except:
#             print(traceback.format_exc())
#             return {'message': 'Error logging in.'}, 400

class DemoProtectedRoute(Resource):
    @jwt_required
    def get(self):
        gg = get_jwt_identity()
        return gg
        # return {
        #     "message": "Congratz, you successfully accessed protected route!"
        # }
