from chatzone import app
from flask import request, make_response, jsonify
from chatzone.models import User
from functools import wraps


class LoginManager(object):
    def __init__(self, app=None):
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        app.login_manager = self

    def _load_user(self):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'status_code': 401,
                    'message': 'Bearer token malformed.'
                }
                return responseObject
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                responseObject = {
                    'status': 'success',
                    'status_code': 200,
                    'id': user.id,
                    'username': user.username
                }
                return responseObject
            responseObject = {
                'status': 'fail',
                'status_code': 401,
                'message': resp
            }
            return responseObject
        else:
            return self.unauthorized() 
    
    def unauthorized(self):
        responseObject = {
                'status': 'fail',
                'status_code': 401,
                'message': 'Provide a valid auth token.'
            }
        return responseObject

    def is_authenticated(self):
        return self._load_user()['status_code'] == 200


def login_required(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if not app.login_manager.is_authenticated():
            responseObject = app.login_manager.unauthorized()
            return make_response(jsonify(responseObject)), responseObject['status_code'] 
        return func(*args, **kwargs)
    return decorated_view
    
