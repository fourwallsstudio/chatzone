import os
import unittest

from flask import current_app
from flask_testing import TestCase
from chatzone import app
user = os.getenv('USER')


class TestDevelopmentConfig(TestCase):
    def create_app(self):
        app.config.from_object('configmodule.DevelopmentConfig')
        return app

    def test_app_is_development(self):
        secret_key = os.getenv('SECRET_KEY', 'no key')
        self.assertTrue(secret_key is not 'no key')
        self.assertTrue(app.config['DEBUG'] is True)
        self.assertFalse(current_app is None)
        self.assertTrue(
                app.config['SQLALCHEMY_DATABASE_URI'] == 'postgresql://' + user + ':@localhost/chatzone_dev'
        )


class TestTestsingConfig(TestCase):
    def create_app(self):
        app.config.from_object('configmodule.TestingConfig')
        return app

    def test_app_is_testing(self):
        secret_key = os.getenv('SECRET_KEY', 'no key')
        self.assertTrue(secret_key is not 'no key')
        self.assertTrue(app.config['DEBUG'] is True)
        self.assertTrue(
                app.config['SQLALCHEMY_DATABASE_URI'] == 'postgresql://' + user + ':@localhost/chatzone_test'
        )


class TestProductionConfig(TestCase):
    def create_app(self):
        app.config.from_object('configmodule.ProductionConfig')
        return app

    def test_app_is_production(self):
        self.assertFalse(app.config['DEBUG'])


if __name__ == '__main__':
    unittest.main() 
