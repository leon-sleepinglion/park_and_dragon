import json, traceback
from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from models.model import TaskModel
from db import db, ma


class TaskSchema(ma.ModelSchema):
    class Meta:
		model = TaskModel

class AllTasksResource(Resource):

    def get(self):
        user_id = request.args.get('user_id')
        try:
            task_schema = TaskSchema()
            all_tasks = TaskModel.get_all()
            all_tasks = [json.loads(task_schema.dumps(x)) for x in all_tasks]
            return all_tasks, 200
        except:
            print(traceback.format_exc())
            return {'message': 'An error occurred. Check console for error message.'}, 400


