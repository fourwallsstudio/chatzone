from setuptools import setup

setup(
    name='chatzone',
    version='1.0',
    packages=['chatzone'],
    include_package_data=True,
    zip_safe=False,
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
