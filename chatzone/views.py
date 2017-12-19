from chatzone import app, static_file_dir 
from flask import json, send_from_directory 

@app.route('/')
def index():
    return send_from_directory(static_file_dir, 'index.html') 


