import traceback, datetime
from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)

from common.util import verify_password
from models.model import User, RevokedTokenModel


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
                access_token = create_access_token(identity=args['email'], expires_delta=datetime.timedelta(hours=1))
                # refresh_token = create_refresh_token(identity=args['name'])
                return {
                    'message': 'Logged in as {}'.format(current_user.email_address),
                    'access_token': access_token
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

class DemoProtectedRoute(Resource):
    @jwt_required
    def get(self):
        return {
            "message": "Congratz, you successfully accessed protected route!"
    }
