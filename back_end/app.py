from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from db import db, ma
from models.model import RevokedTokenModel


app = Flask(__name__)
CORS(app)
api = Api(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
ma.init_app(app)

app.config['SECRET_KEY'] = 'iAmTooSexyForYou'
app.config['JWT_SECRET_KEY'] = 'iAmTooSexyForYou'
jwt = JWTManager(app)

app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_jti_blacklisted(jti)

import resources.Authentication as Authentication
api.add_resource(Authentication.UserLogin, '/login')
api.add_resource(Authentication.UserLogout, '/logout')
api.add_resource(Authentication.DemoProtectedRoute, '/protected')

import resources.Task as Task
api.add_resource(Task.AllTasksResource, '/alltasks')

import resources.VerificationCode as VCode
api.add_resource(VCode.GenerateCode, '/generatecode')
api.add_resource(VCode.ApplyCode, '/applycode')

import resources.Item as Item
api.add_resource(Item.Item, '/getshopitem')

if __name__ == '__main__':
    app.run(debug=True)