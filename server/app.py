#!/usr/bin/env python3
import os
from flask import Flask
from flask_restful import Api
from server.routes import api_bp
from server.models import db
from flask_migrate import Migrate

from flask_cors import CORS

CORS(app, origins=["http://localhost:3000"])

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(app.instance_path, "app.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Initialize database
db.init_app(app)

migrate = Migrate(app, db)

# Enable CORS
CORS(app)

# Register the blueprint for API routes
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True)
