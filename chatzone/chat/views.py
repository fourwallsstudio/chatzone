from flask import json
from flask_socketio import emit, join_room, leave_room
from chatzone import socketio, redisCache

@socketio.on('join')
def on_join(data): 
    data = json.loads(data)
    username = data['username']
    room = data['chatroom']
    
    join_room(room)
    
    msg_data = {
        'username': username,
        'chatroom': room
    }
   
    members = list(map((lambda x: x.decode('utf-8')), redisCache.lrange(room, 0, -1)))
    if username not in members:
        redisCache.rpush(room, username)

    print('joined: ', redisCache.lrange(room, 0, -1))
    emit('joined_chat', msg_data, room=room)


@socketio.on('leave')
def on_leave(data):
    data = json.loads(data)
    username = data['username']
    room = data['chatroom']
    
    leave_room(room)
    
    msg_data = {
        'username': username,
        'chatroom': room
    }

    redisCache.lrem(room, 0,  username)
    print('left: ', room, redisCache.lrange(room, 0, -1))
    emit('left_chat', msg_data, room=room) 




