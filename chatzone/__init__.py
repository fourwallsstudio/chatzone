import os
import redis
import boto3

from flask import Flask, json, jsonify
from flask_sslify import SSLify
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_socketio import SocketIO
from dotenv import load_dotenv

# redis 
redis_url = os.getenv('REDISTOGO_URL', 'localhost')
redisCache = redis.from_url(redis_url)
# redisCache = redis.StrictRedis(host='localhost', port=6379, db=0)

# load dotenv in the base root
APP_ROOT = os.path.join(os.path.dirname(__file__), '..')
dotenv_path = os.path.join(APP_ROOT, '.env')
load_dotenv(dotenv_path)

# static  path
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'static')
print('static: ', static_file_dir)

# boto / aws s3
# bucket_name = os.getenv('S3_BUCKET_NAME')
s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
sslify = SSLify(app)
socketio = SocketIO(app, async='eventlet', engineio_logger=True)

app.config.from_object(os.getenv('CHATZONE_SETTINGS'))
app.config.from_envvar('CHATZONE_SETTINGS', silent=True)

from chatzone.login_manager import LoginManager
login_manager = LoginManager()
login_manager.init_app(app)

import chatzone.models

def create_db():
    db.create_all()


def drop_db():
    db.drop_all()


import chatzone.views
import chatzone.chat.views
import chatzone.message.views

from chatzone.auth.views import auth_blueprint
app.register_blueprint(auth_blueprint)

if __name__ == '__main__':
    socketio.run(app)
