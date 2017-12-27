from flask_script import Manager, Server as _Server
from flask_migrate import Migrate, MigrateCommand
from chatzone import app, db, socketio
import eventlet
# eventlet.monkey_patch()

migrate = Migrate(app, db)
manager = Manager(app)


class Server(_Server):
    def __call__(self, app):
        eventlet.wrap_ssl(socketio)
        socketio.run(app)
        

manager.add_command("runserver", Server())
manager.add_command("db", MigrateCommand)


if __name__ == "__main__":
    manager.run()
