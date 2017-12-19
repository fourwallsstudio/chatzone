import os

from flask import Flask, json, jsonify
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv

# load dotenv in the base root
APP_ROOT = os.path.join(os.path.dirname(__file__), '..')
dotenv_path = os.path.join(APP_ROOT, '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)
CORS(app)

app.config.from_object(os.getenv('CHATZONE_SETTINGS'))
app.config.from_envvar('CHATZONE_SETTINGS', silent=True)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

import chatzone.models


def create_db():
    db.create_all()


def drop_db():
    db.drop_all()


import chatzone.views

from chatzone.auth.views import auth_blueprint
app.register_blueprint(auth_blueprint)
