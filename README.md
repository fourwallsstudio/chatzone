## CHATZONE

#### cli
virtual env:
`. venv/bin/activate`

leave virtual env:
`deactivate`

setuptools:
`pip install -e .`

run server:
`export FLASK_APP=chatzone`
`flask run`

db:
`flask create_db`
`flask db init`
`flask db migrate`
`flask db upgrade`
