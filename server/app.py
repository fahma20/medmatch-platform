#!/usr/bin/env python3
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# Local imports
from .routes import api  # Assuming your routes are in a separate file (routes.py)
from .models import db  # Assuming your models are defined in a separate file (models.py)

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Adjust path to the app.db if needed
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata for your database tables and naming conventions
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)  # Initialize the database with the metadata
migrate = Migrate(app, db)  # Set up migration support for your database
db.init_app(app)  # Bind the app to the db instance

# Instantiate REST API
api = Api(app)

# Instantiate CORS for cross-origin requests
CORS(app)

# Register your API Blueprint (assuming routes are defined in routes.py)
app.register_blueprint(api, url_prefix='/api')

# You can also initialize the database here or in a separate script (example below)
if __name__ == '__main__':
    app.run(debug=True)
