import click
import chatzone


@click.command('create_db')
def create_db_command():
    chatzone.create_db()
    print('created database')

