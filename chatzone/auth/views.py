from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from chatzone import bcrypt, db
from chatzone.models import User, BlacklistToken

auth_blueprint = Blueprint('auth', __name__)


class SignUpAPI(MethodView):
    def post(self):
        post_data = request.form if request.form else request.get_json()
        user = User.query.filter_by(username=post_data.get('username')).first()
        if not user:
            try:
                user = User(
                    username=post_data.get('username'),
                    password=post_data.get('password')
                )
                db.session.add(user)
                db.session.commit()
                auth_token = user.encode_auth_token(user.id)
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully signed up.',
                    'auth_token': auth_token.decode(),
                    'id': user.id,
                    'username': user.username
                }
                return make_response(jsonify(responseObject)), 201
            except Exception as e:
                print(e)
                responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return make_response(jsonify(responseObject)), 401
        else:
            responseObject = {
                'status': 'fail',
                'message': 'User already exists. Please Log in.'
            }
            return make_response(jsonify(responseObject)), 202


class LoginAPI(MethodView):
    def post(self):
        post_data = request.form if request.form else request.get_json()
        try:
            user = User.query.filter_by(
                username=post_data.get('username')
            ).first()
            if user: 
                if bcrypt.check_password_hash(
                    user.password_digest, post_data.get('password')
                ):
                    auth_token = user.encode_auth_token(user.id)
                    if auth_token:
                        responseObject = {
                            'status': 'success',
                            'message': 'Successfully logged in.',
                            'auth_token': auth_token.decode(),
                            'id': user.id,
                            'username': user.username
                        }
                        return make_response(jsonify(responseObject)), 200
                else:
                    responseObject = {
                        'status': 'fail',
                        'message': 'Incorrect password.'
                    }
                    return make_response(jsonify(responseObject)), 422
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'User does not exist.'
                }
                return make_response(jsonify(responseObject)), 404
        except Exception as e:
            print(e)
            responseObject = {
                'status': 'fail',
                'message': 'Try again'
            }
            return make_response(jsonify(responseObject)), 500


class CurrentUserAPI(MethodView):
    def get(self):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Bearer token malformed.'
                }
                return make_response(jsonify(responseObject)), 401
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                responseObject = {
                    'status': 'success',
                    'id': user.id,
                    'username': user.username
                }
                return make_response(jsonify(responseObject)), 200
            responseObject = {
                'status': 'fail',
                'message': resp
            }
            return make_response(jsonify(responseObject)), 401
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(responseObject)), 401

class LogoutAPI(MethodView):
    def post(self):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                blacklist_token = BlacklistToken(token=auth_token)
                try:
                    db.session.add(blacklist_token)
                    db.session.commit()
                    responseObject = {
                        'status': 'success',
                        'message': 'Successfully logged out.'
                    }
                    return make_response(jsonify(responseObject)), 200
                except Exception as e:
                    responseObject = {
                        'status': 'fail',
                        'message': e
                    }
                    return make_response(jsonify(responseObject)), 200
            else:
                print('auth_token error: ', resp)
                responseObject = {
                    'status': 'fail',
                    'message': resp
                }
                return make_response(jsonify(responseObject)), 401
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(responseObject)), 403

        
sign_up_view = SignUpAPI.as_view('sign_up_api')
login_view = LoginAPI.as_view('login_api')
current_user_view = CurrentUserAPI.as_view('current_user_api')
logout_view = LogoutAPI.as_view('logout_api')

auth_blueprint.add_url_rule(
    '/signup',
    view_func=sign_up_view,
    methods=['POST']
)

auth_blueprint.add_url_rule(
    '/login',
    view_func=login_view,
    methods=['POST']
)

auth_blueprint.add_url_rule(
    '/current_user',
    view_func=current_user_view,
    methods=['GET']
)

auth_blueprint.add_url_rule(
    '/logout',
    view_func=logout_view,
    methods=['POST']
)
