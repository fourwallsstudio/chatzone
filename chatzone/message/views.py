from chatzone import app, db, socketio
from flask import make_response, request, jsonify
from chatzone.models import Message, ChatRoom


@app.route('/messages/<chatroom>')
def messages(chatroom):
    chatroom = ChatRoom.query.filter_by(title=chatroom).first()
    if chatroom:
        return make_response(jsonify(chatroom.messages)), 200 
    else:
        return make_response('not a valid chatroom'), 422 


@app.route('/messages', methods=['POST'])
def create_message():
    post_data = request.form if request.form else request.get_json()
    print('messages post_data', post_data)
    
    message = Message(
        body=post_data.get('body'),
        author=post_data.get('author'),
        chatroom=post_data.get('chatroom'),
        user_id=post_data.get('userId'),
        chatroom_id=post_data.get('chatroomId')
    )
    db.session.add(message)
    db.session.commit()
   
    chatroom = ChatRoom.query.filter_by(id=message.chatroom_id).first()
    
    msg = {
        'id': message.id,
        'body': message.body,
        'author': message.author,
        'chatroom': message.chatroom
    }
    
    print('msg', msg)
    socketio.emit('new_message', msg, room=chatroom.title)

    return make_response('success'), 201
        
        
        
    
    

    
