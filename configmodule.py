import os
basedir = os.path.abspath(os.path.dirname(__file__))
user = os.getenv('USER')
postgres_local_base = 'postgresql://' + user + ':@localhost/'

class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False 

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'production_db' 

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = postgres_local_base + 'chatzone_dev'

class TestingConfig(Config):
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = postgres_local_base + 'chatzone_test'
