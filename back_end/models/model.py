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

class TaskModel(db.Model):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    description = db.Column(db.String(512))
    location = db.Column(db.String(512))
    point = db.Column(db.Integer)
    created_on = db.Column(db.String(128), default=db.func.now())
    status = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    @classmethod
    def get_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()


class VerificationCodeModel(db.Model):
    __tablename__ = 'code_assignment'
    id = db.Column(db.Integer, primary_key=True)
    generated_code = db.Column(db.String(128))
    is_used = db.Column(db.Boolean, default=False)

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod
    def match_code(cls, code):
        return cls.query.filter_by(generated_code=code).first()

    @classmethod
    # Find the record and update the is_used property.
    def find_code(cls, code):
        return cls.query.filter_by(generated_code = code).first()
    
    @classmethod
    def commit(cls):
        return db.session.commit()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(512))
    email_address = db.Column(db.String(512))
    password_hash = db.Column(db.String(256))
    user_level = db.Column(db.Integer)
    phone_number = db.Column(db.String(256))
    has_telegram = db.Column(db.Boolean)
    created_on = db.Column(db.String(512), default=db.func.now())
    last_updated = db.Column(db.String(512), default=db.func.now(), onupdate=db.func.now())
    is_deleted = db.Column(db.Boolean, default=False)

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    # This method is used after updating the record in database.
    # Updating any of the database record, doesn't require db.session.add(self), just need db.session.commit() 
    @classmethod
    def update(cls):
        db.session.commit()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email_address=email).first()
