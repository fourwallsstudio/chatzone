from flask import json
from flask_socketio import emit, join_room, leave_room
from chatzone import socketio

@socketio.on('join')
def on_join(data): 
    data = json.loads(data)
    print('joinn', data)
    username = data['username']
    room = data['chatroom']
    join_room(room)
    msg_data = {
        'message': username + ' has entered the zone',
        'room': room
    }
    emit('joined_chat', msg_data, broadcast=True)

@socketio.on('leave')
def on_leave(data):
    data = json.loads(data)
    username = data['username']
    room = data['room']
    leave_room(room)
    msg_data = {
        'message': username + ' has left the zone',
        'room': room
    }
    emit('left_chat', msg_data, broadcast=True) 




