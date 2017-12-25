import os
import redis

from flask import Flask, json, jsonify
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_socketio import SocketIO#, emit, join_room, leave_room
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

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

app.config.from_object(os.getenv('CHATZONE_SETTINGS'))
app.config.from_envvar('CHATZONE_SETTINGS', silent=True)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

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

# if __name__ == '__main__':
#   socketio.run(app)
