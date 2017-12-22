"""empty message

Revision ID: 58017f865d29
Revises: 717cc9e01b7b
Create Date: 2017-12-22 07:04:57.859098

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '58017f865d29'
down_revision = '717cc9e01b7b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('author', sa.String(length=255), nullable=True))
    op.add_column('messages', sa.Column('chatroom', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('messages', 'chatroom')
    op.drop_column('messages', 'author')
    # ### end Alembic commands ###
