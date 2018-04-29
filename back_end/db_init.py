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

    user1 = User(gems=250 ,point=1005, name="leon", email_address="leonweecs@gmail.com", password_hash="$pbkdf2-sha256$29000$u3cO4TwnROjdmzPm/N9biw$8OZEj/4izb9Zt7REh9TMlm35WQtwPFRHDVFM.VhQjl0", user_level=2, phone_number="60104315105", has_telegram=True)
    user2 = User(name="baoxuan", email_address="baoxuan9616@gmail.com", password_hash="alsjdkh9876", user_level=2, phone_number="+60169157190", has_telegram=True)
    user3 = User(name="June", email_address="jeff_bluesky@gmail.com", password_hash="aoio;asd", user_level=2, phone_number="+60198745982", has_telegram=False)
    user4 = User(name="woh", email_address="kamwoh@gmail.com", password_hash="6541lkjhfdg", user_level=1, phone_number="+9876543210", has_telegram=True)
    user5 = User(name="tecklee", email_address="tecklee@gmail.com", password_hash="adfasdf", user_level=1, phone_number="+9876543218", has_telegram=False)

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
    db.session.add_all([user1, user2, user3, user4, user5])

    from models.model import ItemModel

    item1 = ItemModel(category="in-game", name="Infinity sword", description="It is a normal sword, what do you expect?", coins=10, gems=2, types="accessory", image_url="http://www.clker.com/cliparts/a/7/c/6/1194989442932416363sword_01.svg.hi.png")
    item2 = ItemModel(category="in-game", name="Silver shield", description="It is a normal shield, what do you expect?", coins=20, gems=2, types="accessory", image_url="https://cdn0.iconfinder.com/data/icons/communication-and-multimedia/48/communication_and_multimedia_flat_icons-10-512.png")
    item3 = ItemModel(category="in-game", name="Knight Armor", description="It reduces the damage you take.", coins=50, gems=20, types="clothes", image_url="https://vignette.wikia.nocookie.net/helmet-heroes/images/f/f9/Knight_Armor.png/revision/latest?cb=20131025151115")
    item4 = ItemModel(category="in-game", name="Helm of Dominator", description="It enables lifesteal on your physical attack!", coins=200, gems=20, types="clothes", image_url="http://diysolarpanelsv.com/images/crusader-helmet-clip-art-48.png")
    item5 = ItemModel(category="in-game", name="Thanos' glove", description="It collects stone automatically.", coins=1000, gems=20, types="accessory", image_url="https://ae01.alicdn.com/kf/HTB1__g9i3fH8KJjy1zcq6ATzpXa9/Avengers-Infinity-War-Thanos-Infinity-Gauntlet-Cosplay-Latex-Gloves-Superhero-Avengers-Thanos-Glove-Halloween-Party-Accessories.jpg_640x640.jpg")
    item6 = ItemModel(category="rewards", name="2xRM10", description="It collects stone automatically.", coins=1000, gems=20, types="accessory", image_url="https://ae01.alicdn.com/kf/HTB1__g9i3fH8KJjy1zcq6ATzpXa9/Avengers-Infinity-War-Thanos-Infinity-Gauntlet-Cosplay-Latex-Gloves-Superhero-Avengers-Thanos-Glove-Halloween-Party-Accessories.jpg_640x640.jpg")
    item1.save_item()
    item2.save_item()
    item3.save_item()
    item4.save_item()
    item5.save_item()
    db.session.commit()

    from models.model import UserItemModel

    useritem1 = UserItemModel(user_id=1, item_id=2)
    useritem2 = UserItemModel(user_id=1, item_id=3)

    db.session.add(useritem1)
    db.session.add(useritem2)

    db.session.commit()


