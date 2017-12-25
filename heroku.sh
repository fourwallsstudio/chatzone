#!/bin/bash
. venv/bin/activate
pip install -r requirements.text
python setup.py install
flask run
