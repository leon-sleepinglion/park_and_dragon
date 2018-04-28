import traceback, json
from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
from models.model import UserItemModel
from db import ma

class Item(Resource):
    @jwt_required
    def get(self):
        user = request.args.get('user')

        items = UserItemModel.item_not_own_by_user(user)
        print(items)

        return {'message': 'List of item not own by user.', 'item':items}, 200

    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_id')
        parser.add_argument('item_id')

        acUserItemModel(user_id=args['user_id'], item_id=args['item_id'])



