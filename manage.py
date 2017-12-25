from flask_script import Manager, Server
from chatzone import app, socketio

manager = Manager(app)


class Server(_Server):
    def __call__(self):
        socketio.run(app)
        

manager.add_command("runserver", Server())

if __name__ == "__main__":
    manager.run()
