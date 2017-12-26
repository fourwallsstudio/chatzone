from chatzone import app, db, socketio
from flask import make_response, request, jsonify
from chatzone.models import Message, ChatRoom
from chatzone.login_manager import login_required 


@app.route('/messages/<chatroom>/<int:page>')
@login_required
def messages(chatroom, page):
    chatroom = ChatRoom.query.filter_by(title=chatroom).first()
    if chatroom:
        messages = []
        pg = 1 if not page else page
        end = len(chatroom.messages) - (pg -1) * 20
        st = end - 20
        print('page', st)
        
        for m in chatroom.messages[st:end]:
            messages.append({
                'id': m.id,
                'body': m.body,
                'author': m.author,
                'chatroom': m.chatroom,
            })

        return make_response(jsonify(messages)), 200 
    else:
        return make_response('not a valid chatroom'), 422 


@app.route('/messages', methods=['POST'])
@login_required
def create_message():
    post_data = request.form if request.form else request.get_json()
    
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
    
    print('new_msg', msg)
    print('sid', request.sid)
    socketio.emit('new_message', msg, room=chatroom.title)

    return make_response('success'), 201
        
        
        
    
    

    
