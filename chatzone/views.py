from chatzone import app, static_file_dir, db, redisCache
from flask import jsonify, send_from_directory, make_response
from chatzone.models import ChatRoom
from chatzone.login_manager import login_required

@app.route('/')
def index():
    return send_from_directory(static_file_dir, 'index.html')  

@app.route('/chatrooms')
@login_required
def chatrooms():
    chatrooms = ChatRoom.query.all()    
    data = []
    for cr in chatrooms:
        data.append({ 'id': cr.id, 'title': cr.title });

    return make_response(jsonify(data)), 200

@app.route('/members/<chatroom>')
@login_required
def members(chatroom):
    members = redisCache.lrange(chatroom, 0, -1)
    data = list(map((lambda x: x.decode('utf-8')), members))
    print('members ', chatroom, data)
    return make_response(jsonify(data)), 200
