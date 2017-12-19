import unittest
import json
import time

from chatzone import db
from chatzone.models import User, BlacklistToken
from chatzone.tests.base import BaseTestCase


class TestAuthBlueprint(BaseTestCase):
    pass

    def sign_up_user(self, username, password):
        return self.client.post(
            '/signup',
            data=json.dumps(dict(
                username=username,
                password=password
            )),
            content_type='application/json'
        )

    def login_user(self, username, password):
        return self.client.post(
            '/login',
            data=json.dumps(dict(
                username=username,
                password=password
            )),
            content_type='application/json'
        )

    def test_sign_up(self):
        with self.client:
            response = self.sign_up_user('testusername', 'testpassword') 
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['message'] == 'Successfully signed up.')
            self.assertTrue(data['auth_token'])
            self.assertTrue(response.content_type == 'application/json')
            self.assertEqual(response.status_code, 201)

    def test_sign_up_with_already_signed_up_user(self):
        user = User(
            username='testusername',
            password='testpassword'
        )
        db.session.add(user)
        db.session.commit()
        with self.client:
            response = self.sign_up_user('testusername', 'testpassword') 
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(
                data['message'] == 'User already exists. Please Log in.')
            self.assertTrue(response.content_type == 'application/json')
            self.assertEqual(response.status_code, 202)

    def test_signed_up_user_login(self):
        with self.client:
            # sign up user
            resp_register = self.sign_up_user('testusername', 'testpassword') 
            data_register = json.loads(resp_register.data.decode())
            self.assertTrue(data_register['status'] == 'success')
            self.assertTrue(
                data_register['message'] == 'Successfully signed up.'
            )
            self.assertTrue(data_register['auth_token'])
            self.assertTrue(resp_register.content_type == 'application/json')
            self.assertTrue(resp_register.status_code, 201)
            # login in user
            response = self.login_user('testusername', 'testpassword') 
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['message'] == 'Successfully logged in.')
            self.assertTrue(data['auth_token'])
            self.assertTrue(response.content_type == 'application/json')
            self.assertTrue(response.status_code, 200)
            
    def test_non_signed_up_user_login(self):
        with self.client:
            response = self.login_user('testusername', 'wrongpassword') 
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(data['message'] == 'User does not exist.')
            self.assertTrue(response.content_type == 'application/json')
            self.assertEqual(response.status_code, 404)

    def test_user_login_with_wrong_password(self):
        with self.client:
            # sign up user
            resp_register = self.sign_up_user('testusername', 'testpassword') 
            data_register = json.loads(resp_register.data.decode())
            self.assertTrue(data_register['status'] == 'success')
            self.assertTrue(
                data_register['message'] == 'Successfully signed up.'
            )
            self.assertTrue(data_register['auth_token'])
            self.assertTrue(resp_register.content_type == 'application/json')
            self.assertTrue(resp_register.status_code, 201)
            # attempt login
            response = self.login_user('testusername', 'wrongpassword') 
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(data['message'] == 'Incorrect password.')
            self.assertTrue(response.content_type == 'application/json')
            self.assertTrue(response.status_code, 422)

    def test_get_current_user(self):
        with self.client:
            resp_register = self.sign_up_user('testusername', 'testpassword') 
            response = self.client.get(
                '/current_user',
                headers=dict(
                    Authorization='Bearer ' + json.loads(
                        resp_register.data.decode()
                    )['auth_token']
                )
            )
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['data'] is not None)
            self.assertTrue(data['data']['username'] == 'testusername')
            self.assertEqual(response.status_code, 200)

    def test_valid_logout(self):
        with self.client:
            # sign up user
            resp_register = self.sign_up_user('testusername', 'testpassword') 
            data_register = json.loads(resp_register.data.decode())
            self.assertTrue(data_register['status'] == 'success')
            self.assertTrue(
                data_register['message'] == 'Successfully signed up.'
            )
            self.assertTrue(data_register['auth_token'])
            self.assertTrue(resp_register.content_type == 'application/json')
            self.assertTrue(resp_register.status_code, 201)
            # login in user
            resp_login = self.login_user('testusername', 'testpassword') 
            data = json.loads(resp_login.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['message'] == 'Successfully logged in.')
            self.assertTrue(data['auth_token'])
            self.assertTrue(resp_login.content_type == 'application/json')
            self.assertTrue(resp_login.status_code, 200)
            # logout
            response = self.client.post(
                '/logout',
                headers=dict(
                    Authorization='Bearer ' + json.loads(
                        resp_login.data.decode()
                    )['auth_token']
                )
            )
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['message'] == 'Successfully logged out.')
            self.assertEqual(response.status_code, 200)

    def test_invalid_logout(self):
        with self.client:
            # sign up user
            resp_register = self.sign_up_user('testusername', 'testpassword') 
            data_register = json.loads(resp_register.data.decode())
            self.assertTrue(data_register['status'] == 'success')
            self.assertTrue(
                data_register['message'] == 'Successfully signed up.'
            )
            self.assertTrue(data_register['auth_token'])
            self.assertTrue(resp_register.content_type == 'application/json')
            self.assertTrue(resp_register.status_code, 201)
            # login in user
            resp_login = self.login_user('testusername', 'testpassword') 
            data = json.loads(resp_login.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['message'] == 'Successfully logged in.')
            self.assertTrue(data['auth_token'])
            self.assertTrue(resp_login.content_type == 'application/json')
            self.assertTrue(resp_login.status_code, 200)
            # attempt logout
            time.sleep(6)
            response = self.client.post(
                '/logout',
                headers=dict(
                    Authorization='Bearer ' + json.loads(
                        resp_login.data.decode()
                    )['auth_token']
                )
            )
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(
                data['message'] == 'Signature expired, Please log in again.')
            self.assertEqual(response.status_code, 401)

    def test_valid_blacklisted_token_logout(self):
        with self.client:
            # sign up user
            resp_register = self.sign_up_user('testusername', 'testpassword') 
            data_register = json.loads(resp_register.data.decode())
            self.assertTrue(data_register['status'] == 'success')
            self.assertTrue(
                data_register['message'] == 'Successfully signed up.'
            )
            self.assertTrue(data_register['auth_token'])
            self.assertTrue(resp_register.content_type == 'application/json')
            self.assertTrue(resp_register.status_code, 201)
            # login in user
            resp_login = self.login_user('testusername', 'testpassword') 
            data = json.loads(resp_login.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['message'] == 'Successfully logged in.')
            self.assertTrue(data['auth_token'])
            self.assertTrue(resp_login.content_type == 'application/json')
            self.assertTrue(resp_login.status_code, 200)
            # blacklist a valid token
            blacklist_token = BlacklistToken(
                token=json.loads(resp_login.data.decode())['auth_token'])
            db.session.add(blacklist_token)
            db.session.commit()
            # blacklisted valid token logout
            response = self.client.post(
                '/logout',
                headers=dict(
                    Authorization='Bearer ' + json.loads(
                        resp_login.data.decode()
                    )['auth_token']
                )
            )
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(data['message'] == 'Token blacklisted. Please log in again.')
            self.assertEqual(response.status_code, 401)

    def test_valid_blacklisted_token_user(self):
        with self.client:
            resp_register = self.sign_up_user('testusername', 'testpassword') 
            # blacklist a valid token
            blacklist_token = BlacklistToken(
                token=json.loads(resp_register.data.decode())['auth_token'])
            db.session.add(blacklist_token)
            db.session.commit()
            response = self.client.get(
                '/current_user',
                headers=dict(
                    Authorization='Bearer ' + json.loads(
                        resp_register.data.decode()
                    )['auth_token']
                )
            )
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(data['message'] == 'Token blacklisted. Please log in again.')
            self.assertEqual(response.status_code, 401)

    def test_current_user_malformed_bearer_token(self):
        with self.client:
            resp_register = self.sign_up_user('testusername', 'testpassword')
            response = self.client.get(
                '/current_user',
                headers=dict(
                    Authorization='Bearer' + json.loads(
                        resp_register.data.decode()
                    )['auth_token']
                )
            )
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(data['message'] == 'Bearer token malformed.')
            self.assertEqual(response.status_code, 401)


if __name__ == '__main__':
    unittest.main()
