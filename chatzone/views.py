import os
import datetime
from chatzone import app, static_file_dir, db, redisCache
from flask import jsonify, request, send_from_directory, make_response, redirect
from chatzone.models import ChatRoom, User
from chatzone.login_manager import login_required
from chatzone.helpers import upload_file_to_s3
from sqlalchemy import update

@app.route('/')
def index():
    return send_from_directory(static_file_dir, 'index.html')  

@app.route('/<chatroom>')
def redirect_to_index(chatroom):
    validChat = ChatRoom.query.filter_by(title=chatroom).first()
    if validChat:
        return redirect('/', code=302)
    else:
        return send_from_directory(static_file_dir, '404.html')

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

@app.route('/update_current_user', methods=['POST'])
def update_current_user():
    post_data = request.files
    post_form_data = request.form
    print('post_data', post_data, post_form_data)
    
    if post_data['avatar']:
        file = post_data['avatar']
        url = upload_file_to_s3(file, os.getenv('S3_BUCKET_NAME'))
        user = User.query.filter_by(id=post_form_data.get('userId')).first()
        
        if user:
            user.avatar = url
            user.updated_at = datetime.datetime.now()

            db.session.commit()

        responseObject = { 
            'avatar': user.avatar,
            'id': user.id,
            'username': user.username
        }

        return make_response(jsonify(responseObject)), 200
        
    return ''

