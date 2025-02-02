# models.py
# models.py

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from .config import db

from flask_sqlalchemy import SQLAlchemy

# Instantiate the database object
db = SQLAlchemy()

# Client Model (One-to-Many Relationship with Appointments)
class Client(db.Model):
    __tablename__ = 'clients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    # One-to-many relationship: a client can have many appointments
    appointments = db.relationship('Appointment', backref='client', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }

# HealthcareProfessional Model (One-to-Many Relationship with Appointments and Many-to-Many with Specializations)
class HealthcareProfessional(db.Model):
    __tablename__ = 'healthcare_professionals'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), default='Active')
    
    
    # One-to-many relationship: a healthcare professional can have many appointments
    appointments = db.relationship('Appointment', backref='healthcare_professional', lazy=True)

    # Many-to-many relationship: a healthcare professional can have many specializations
    specializations = db.relationship('ProfessionalSpecialization', back_populates='healthcare_professional', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specializations': [ps.to_dict() for ps in self.specializations]  # Include specializations with status
        }


# Specialization Model (Many-to-Many Relationship with HealthcareProfessionals)
class Specialization(db.Model):
    __tablename__ = 'specializations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    # Many-to-many relationship: a specialization can belong to many healthcare professionals
    healthcare_professionals = db.relationship('ProfessionalSpecialization', back_populates='specialization', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

#ProfessionalSpecialization Model (Many-to-Many Relationship with an additional user-submittable 'status' attribute)
class ProfessionalSpecialization(db.Model):
    __tablename__ = 'professional_specializations'
    id = db.Column(db.Integer, primary_key=True)
    healthcare_professional_id = db.Column(db.Integer, db.ForeignKey('healthcare_professionals.id'), nullable=False)
    specialization_id = db.Column(db.Integer, db.ForeignKey('specializations.id'), nullable=False)
    status = db.Column(db.String(50), default='Active')  # User-submittable field, can be 'Active', 'Inactive', etc.

    healthcare_professional = db.relationship('HealthcareProfessional', back_populates='specializations')
    specialization = db.relationship('Specialization', back_populates='healthcare_professionals')

    def to_dict(self):
        return {
            'id': self.id,
            'healthcare_professional_id': self.healthcare_professional_id,
            'specialization_id': self.specialization_id,
            'status': self.status,
            'specialization_name': self.specialization.name  # Include specialization name for easier frontend display
        }


# Appointment Model (Many-to-One Relationships with both Client and HealthcareProfessional)
class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(100), nullable=False)
    time = db.Column(db.String(100), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    healthcare_professional_id = db.Column(db.Integer, db.ForeignKey('healthcare_professionals.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date,
            'time': self.time,
            'client_id': self.client_id,
            'healthcare_professional_id': self.healthcare_professional_id
        }