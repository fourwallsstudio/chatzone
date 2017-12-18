import jwt
import datetime

from chatzone import app, db, bcrypt


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password_digest = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password_digest = bcrypt.generate_password_hash(password).decode()
        self.created_at = datetime.datetime.now()
        self.updated_at = datetime.datetime.now()

    def encode_auth_token(self, user_id):
        try:
            payload = {
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
                    'iat': datetime.datetime.utcnow(),
                    'sub': user_id
            }
            return jwt.encode(
                    payload,
                    app.config.get('SECRET_KEY'),
                    algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired, Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
