from chatzone import db
from chatzone.models import ChatRoom

CHATROOMS = [
    'Music', 'Art', 'Tech', 'Sports', 'Politics', 'Film', 'Fashion', 'Science', 'Food'
]

for title in CHATROOMS:
    chatroom = ChatRoom( title=title )
    db.session.add(chatroom)
    db.session.commit()

