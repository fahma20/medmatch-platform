# models.py
# models.py

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Healthcare Professional Table
class HealthcareProfessional(db.Model):
    __tablename__ = 'healthcare_professionals'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    # One-to-many relationship with ProfessionalSpecialization
    professional_specializations = db.relationship('ProfessionalSpecialization', back_populates='healthcare_professional')

    # One-to-many relationship with Appointments
    appointments = db.relationship('Appointment', back_populates='healthcare_professional')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specializations': [specialization.specialization for specialization in self.professional_specializations]
        }

# Specialization Table
class Specialization(db.Model):
    __tablename__ = 'specializations'
    id = db.Column(db.Integer, primary_key=True)
    specialization = db.Column(db.String(100))

    # One-to-many relationship with ProfessionalSpecialization
    professional_specializations = db.relationship('ProfessionalSpecialization', back_populates='specialization')

    def to_dict(self):
        return {
            'id': self.id,
            'specialization': self.specialization
        }

# ProfessionalSpecialization Table (Bridge Table for Many-to-Many Relationship)
class ProfessionalSpecialization(db.Model):
    __tablename__ = 'professional_specializations'
    id = db.Column(db.Integer, primary_key=True)
    healthcare_professional_id = db.Column(db.Integer, db.ForeignKey('healthcare_professionals.id'), nullable=False)
    specialization_id = db.Column(db.Integer, db.ForeignKey('specializations.id'), nullable=False)
    status = db.Column(db.String(20), default='Active')  # Active or Inactive status

    healthcare_professional = db.relationship('HealthcareProfessional', back_populates='professional_specializations')
    specialization = db.relationship('Specialization', back_populates='professional_specializations')

    def to_dict(self):
        return {
            'id': self.id,
            'healthcare_professional_id': self.healthcare_professional_id,
            'specialization_id': self.specialization_id,
            'status': self.status
        }

# Client Table
class Client(db.Model):
    __tablename__ = 'clients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)

    # One-to-many relationship with Appointments
    appointments = db.relationship('Appointment', back_populates='client')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }

# Appointment Table
class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    healthcare_specialization_id = db.Column(db.Integer, db.ForeignKey('professional_specializations.id'), nullable=False)
    healthcare_professional_id = db.Column(db.Integer, db.ForeignKey('healthcare_professionals.id'), nullable=False)  # Add this line

    client = db.relationship('Client', back_populates='appointments')
    healthcare_specialization = db.relationship('ProfessionalSpecialization', back_populates='appointments')
    healthcare_professional = db.relationship('HealthcareProfessional', back_populates='appointments')  # Add this line

    def to_dict(self):
        return {
            'id': self.id,
            'client': self.client.name,
            'specialization': self.healthcare_specialization.specialization.specialization,
            'date': self.date.strftime('%Y-%m-%d'),
            'time': self.time.strftime('%H:%M:%S')
        }
