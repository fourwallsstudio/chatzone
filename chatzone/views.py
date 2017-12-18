from chatzone import app
from flask import json, jsonify

@app.route('/')
def index():
    return jsonify(msg='chatzone')
