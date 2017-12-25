from flask_script import Manager, Server as _Server
from chatzone import app, socketio
import eventlet
eventlet.monkey_patch()

manager = Manager(app)


class Server(_Server):
    def __call__(self, app):
        socketio.run(app)
        

manager.add_command("runserver", Server())

if __name__ == "__main__":
    manager.run()
