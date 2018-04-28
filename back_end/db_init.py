from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from db import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

with app.app_context():
    from models.model import User
    db.init_app(app)
    db.create_all()
    
    gg = User(name="leon", email_address="leonweecs@gmail.com", password_hash="52345khk", user_level=2, phone_number="+60125685478", has_telegram=True)
    gg2 = User(name="baoxuan", email_address="baoxuan9616@gmail.com", password_hash="alsjdkh9876", user_level=2, phone_number="+60169157190", has_telegram=True)
    gg3 = User(name="June", email_address="jeff_bluesky@gmail.com", password_hash="aoio;asd", user_level=2, phone_number="+60198745982", has_telegram=False)
    gg4 = User(name="woh", email_address="kamwoh@gmail.com", password_hash="6541lkjhfdg", user_level=1, phone_number="+9876543210", has_telegram=True)
    gg5 = User(name="tecklee", email_address="tecklee@gmail.com", password_hash="adfasdf", user_level=1, phone_number="+9876543218", has_telegram=False)
    
    db.session.add(gg)
    db.session.add(gg2)
    db.session.add(gg3)
    db.session.add(gg4)
    db.session.add(gg5)

    # db.session.commit()
    # from models.model import TaskModel
    # gg6 = TaskModel(
    #     name="Mission1",
    #     description="GGWP",
    #     location="CoSpace Park",
    #     point=25,
    #     status=0,
    #     user_id=1
    # )
    # gg7 = TaskModel(
    #     name="Mission2",
    #     description="GGWP",
    #     location="CoSpace Park",
    #     point=25,
    #     status=2,
    #     user_id=2
    # )
    # db.session.add(gg6)
    # db.session.add(gg7)
    db.session.commit()

