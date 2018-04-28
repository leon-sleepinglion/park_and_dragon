import traceback, json
from flask import request
from flask_restful import Resource, reqparse
from models.model import UserItemModel
from db import ma

class Item(Resource):
    def get(self):
        user = request.args.get('user')

        items = UserItemModel.item_not_own_by_user(user)
        print(items)

        return {'message': 'List of item not own by user.', 'item':items}, 200
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_id')
        parser.add_argument('item_id')

        acUserItemModel(user_id=args['user_id'], item_id=args['item_id'])



