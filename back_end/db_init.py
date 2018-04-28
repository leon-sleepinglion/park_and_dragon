from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from db import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

with app.app_context():
    from models.model import User, TaskModel
    db.init_app(app)
    db.drop_all()
    db.create_all()

    gg = User(point=35, name="leon", email_address="leonweecs@gmail.com", password_hash="$pbkdf2-sha256$29000$u3cO4TwnROjdmzPm/N9biw$8OZEj/4izb9Zt7REh9TMlm35WQtwPFRHDVFM.VhQjl0", user_level=2, phone_number="60104315105", has_telegram=True)
    gg2 = User(name="baoxuan", email_address="baoxuan9616@gmail.com", password_hash="alsjdkh9876", user_level=2, phone_number="+60169157190", has_telegram=True)
    gg3 = User(name="June", email_address="jeff_bluesky@gmail.com", password_hash="aoio;asd", user_level=2, phone_number="+60198745982", has_telegram=False)
    gg4 = User(name="woh", email_address="kamwoh@gmail.com", password_hash="6541lkjhfdg", user_level=1, phone_number="+9876543210", has_telegram=True)
    gg5 = User(name="tecklee", email_address="tecklee@gmail.com", password_hash="adfasdf", user_level=1, phone_number="+9876543218", has_telegram=False)

    task1 = TaskModel(
        name = "Purchase 10 Sundae Cones at McDonalds.",
        description= "Purchase 10 Sundae Cone during weekdays, 2-6PM. ",
        location = "CoSpace Park",
        point=50,
        status=1,
        user_id=1,
        count=4
    )
    task2 = TaskModel(
        name = "Pipe District",
        description= "Dine in at 31 August to celebrate the birth of Malaysia!! Purchase a set of our infamous Smoked Turkey set lunch.",
        location = "CoSpace Park",
        point=70,
        status=1,
        user_id=1,
        count=0
    )
    task3 = TaskModel(
        name = "Hai Di Lao Hotpot",
        description= "Come in group of 5 to complete the mission.",
        location = "CoSpace Park",
        point=30,
        status=1,
        user_id=1,
        count=0
    )

    db.session.add_all([task1, task2, task3])
    db.session.add_all([gg, gg2, gg3, gg4, gg5])
    
    
    db.session.add(gg)
    db.session.add(gg2)
    db.session.add(gg3)
    # db.session.add(gg4)
    # db.session.add(gg5)

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

    from models.model import ItemModel
    item1 = ItemModel(name="sword", description="It is a sword, what do you expect?",coins=10, gems=2, types="sohai")
    item2 = ItemModel(name="shield", description="It is a shield, what do you expect?",coins=20, gems=2, types="sohai")
    item3 = ItemModel(name="Thanos' glove", description="It collects stone automatically.",coins=1000, gems=20, types="sohai")
    item1.save_item()
    item2.save_item()
    item3.save_item()
    db.session.commit()

    from models.model import UserItemModel

    useritem1 = UserItemModel(user_id=1, item_id=2)
    useritem2 = UserItemModel(user_id=1, item_id=3)

    db.session.add(useritem1)
    db.session.add(useritem2)

    db.session.commit()

    print(type(db.session.query(UserItemModel, ItemModel).filter(UserItemModel.item_id == ItemModel.id).filter(UserItemModel.user_id == 1).all()))


