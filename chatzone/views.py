from chatzone import app, static_file_dir, db
from flask import jsonify, send_from_directory, make_response
from chatzone.models import ChatRoom

@app.route('/')
def index():
    return send_from_directory(static_file_dir, 'index.html')  

@app.route('/chatrooms')
def chatrooms():
    chatrooms = ChatRoom.query.all()    
    data = []
    for cr in chatrooms:
        data.append({ 'id': cr.id, 'title': cr.title });

    data = jsonify(data)
    return make_response(data), 200


