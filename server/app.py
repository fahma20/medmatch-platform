#!/usr/bin/env python3
from flask import Flask
from flask_restful import Api
from server.routes import api_bp  # Import the blueprint
from server.models import db  # Import your database setup
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Initialize database
db.init_app(app)

# Enable CORS
CORS(app)

# Register the blueprint for API routes
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True)
