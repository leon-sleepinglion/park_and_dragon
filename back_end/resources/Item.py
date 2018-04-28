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

        # items = db.session.query(UserItemModel, ItemModel).filter(UserItemModel.item_id == ItemModel.id).filter(UserItemModel.user_id != user).all()

        sql = "SELECT item.id, item.name, item.description, item.coins, item.gems FROM item INNER JOIN user_item WHERE user_item.item_id = item.id WHERE user_item.user_id =: param", {"param": str(user)   }
        
        result = db.engine.execute(sql)
        print(result)
        # return {'message': 'List of item not own by user.', 'item':items}, 200
    
    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_id')
        parser.add_argument('item_id')
        args = parser.parse_args()

        useritem = UserItemModel(user_id=args['user_id'], item_id=args['item_id'])
        # print(type(useritem))
        # UserItemSchema.dumps(useritem).data


