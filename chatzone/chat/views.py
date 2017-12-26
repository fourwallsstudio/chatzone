from flask import json, request
from flask_socketio import emit, join_room, leave_room
from chatzone import socketio, redisCache, db
from chatzone.models import ChatRoom

@socketio.on('join')
def on_join(data): 
    data = json.loads(data)
    username = data['username']
    room = data['chatroom']
    
    join_room(room)

    members = list(map((lambda x: x.decode('utf-8')), redisCache.lrange(room, 0, -1)))
    if username not in members:
        redisCache.rpush(room, username)

    sid = request.sid
    redisCache.hmset(sid, { 'username': username, 'chatroom': room })
    
    chatroom = ChatRoom.query.filter_by(title=room).first() 

    msg_data = {
        'chatroom': chatroom.title,
        'id': chatroom.id,
        'username': username
    }

    print('sid', sid, 'msg_data', msg_data)
    emit('joined_chat', msg_data, room=room)


@socketio.on('leave')
def on_leave(data):
    data = json.loads(data)
    print('leave data', data)
    if 'chatroom' not in data.keys():
        disconnect()
    else:
        username = data['username']
        room = data['chatroom']
        
        leave_room(room)
        
        msg_data = {
            'username': username,
            'chatroom': room
        }

        redisCache.lrem(room, username, 0)
        
        sid = request.sid
        redisCache.hmset(sid, { 'username': username, 'chatroom': '' })

        print('sid', sid, 'msg_data', msg_data)
        emit('left_chat', msg_data, room=room) 


@socketio.on('disconnect')
def disconnect():
    username, chatroom = redisCache.hmget(request.sid, 'username', 'chatroom')
    redisCache.delete(request.sid)
    
    print('disconnect', username, chatroom, request.sid)
    if chatroom:
        redisCache.lrem(chatroom, username, 0)

        msg_data = {
            'username': username.decode('utf-8'),
            'chatroom': chatroom.decode('utf-8')
        }
        
        emit('left_chat', msg_data, room=chatroom.decode('utf-8')) 
        


