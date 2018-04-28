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