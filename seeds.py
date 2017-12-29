import random
from chatzone import db
from chatzone.models import ChatRoom, User, Message
from faker import Faker
fake = Faker()

CHATROOMS = [
    'Music', 'Art', 'Tech', 'Sports', 'Politics', 'Film', 'Fashion', 'Science', 'Food'
]

for title in CHATROOMS:
    chatroom = ChatRoom( title=title )
    db.session.add(chatroom)
    db.session.commit()

users = [];

for i in range(20):
    users.append(fake.user_name())

for user in users:
    newUser = User(
        username=user,
        password="carrot"
    )    
    db.session.add(newUser)
    db.session.commit()

    for m in range(20):
        text = fake.sentence(nb_words=10, variable_nb_words=True, ext_word_list=None)
        idx = random.choice(range(9))
        msg = Message(
            body=text,
            author=newUser.username,
            chatroom=CHATROOMS[idx],
            user_id=newUser.id,
            chatroom_id=idx + 1,
        )
        db.session.add(msg)
        db.session.commit()

