import click
import chatzone


@click.command('create_db')
def create_db_command():
    chatzone.create_db()
    print('created database')

@click.command('drop_db')
def drop_db_command():
    chatzone.drop_db()
    print('dropped database')
