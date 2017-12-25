from flask_script import Manager, Server as _Server
from flask_migrate import Migrate, MigrateCommand
from chatzone import app, db, socketio, create_db, drop_db
import eventlet
eventlet.monkey_patch()

migrate = Migrate(app, db)
manager = Manager(app)


class Server(_Server):
    def __call__(self, app):
        socketio.run(app)
        

manager.add_command("runserver", Server())
manager.add_command("db", MigrateCommand)
manager.add_command("create_db", create_db())
manager.add_command("drop_db", drop_db())


if __name__ == "__main__":
    manager.run()
