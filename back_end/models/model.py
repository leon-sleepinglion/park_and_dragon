from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from db import db


class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)

class TaskModel(db.model):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    description = db.Column(db.String(512))
    location = db.Column(db.String(512))
    point = db.Column(db.Integer)
    created_on = db.Column(db.String(128), default=db.func.now())

    @classmethod
    def get_all(cls):
        return cls.query.all()

class TaskAssignmentModel(db.model):
    __tablename__ = 'task_assignment'
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey("task.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    status = db.Column(db.Integer)