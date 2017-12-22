from setuptools import setup

setup(
    name='chatzone',
    version='1.0',
    packages=['chatzone'],
    include_package_data=True,
    zip_safe=False,
    entry_points="""
        [flask.commands]
        create_db=mypackage.commands:create_db_command
        drop_db=mypackage.commands:drop_db_command
    """,
    install_requires=[
        'flask',
    ],
    setup_requires=[
        'pytest-runner',
    ],
    tests_require=[
        'pytest',
    ],
)
