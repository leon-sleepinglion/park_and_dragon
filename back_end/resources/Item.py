import traceback, json
from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
from models.model import UserItemModel, User, ItemModel
from db import ma, db

class Item(Resource):
    @jwt_required
    def get(self):
        user_id = request.args.get('user')

        try:
            sql = "SELECT item.id, item.name, item.description, item.coins, item.gems, item.category, item.types, item.image_url FROM item JOIN user_item ON user_item.item_id = item.id WHERE user_item.user_id = " + user_id
        
            result = db.engine.execute(sql)

            items = [{
                "name":x["name"], 
                "id":x["id"], 
                "description":x["description"], 
                "coins": x["coins"], 
                "gems":x["gems"], "types":x["types"], "category":x["category"], "image_url":x["image_url"]} for x in result]
        
            if(items.__len__ == 0):
                return {'message': '0 item own by user.', 'item':items}, 200
            else:
                return {'message': 'List of items own by user.', 'item':items}, 200
    
        except:
            print(traceback.format_exc())
            return {'message': 'An error occurred. Check console for more info.'}


    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_id')
        parser.add_argument('item_id')
        args = parser.parse_args()

        try:
            user_item = UserItemModel(user_id=args['user_id'], item_id=args['item_id'])
            user_item.save()
            user = User.query.get(args['user_id'])
            item = ItemModel.query.get(args['item_id'])
            user.point = user.point - item.coins
            db.session.commit()
            return {'message': 'Item bought'}, 200
        except:
            print(traceback.format_exc())
            return {'message': 'An error occurred. Check console for more info.'}

class ShopItem(Resource):
    @jwt_required
    def get(self):
        user_id = request.args.get('user')

        try:
            sql = "SELECT item.id, item.name, item.description, item.coins, item.gems, item.types, item.image_url, item.category FROM item JOIN user_item ON user_item.item_id != item.id WHERE user_item.user_id = " + user_id
        
            result = db.engine.execute(sql)

            items = [{
            "name":x["name"], 
            "id":x["id"], 
            "description":x["description"], 
            "coins": x["coins"], 
            "gems":x["gems"], 
            "types":x["types"],
            "category":x["category"],
            "image_url":x["image_url"]} for x in result]

            gg = []
            temp = False
            for item in items:
                for x in gg:
                    temp = False
                    if item["id"] == x["id"]:
                        temp = True
                        break
                if not temp:
                    gg.append(item)
                    temp = False

            if(items.__len__ == 0):
                return {'message': 'Shop has 0 item', 'item':gg}, 200
            else:
                return {'message': 'List of items in the shop.', 'item':gg}, 200
        
        except:
            print(traceback.format_exc())
            return {'message': 'An error occurred. Check console for more info.'}