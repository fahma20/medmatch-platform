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
    email = db.Column(db.String(100), unique=True)
    phone_number = db.Column(db.String(20))
    # Other fields can be added

    # One-to-many relationship with ProfessionalSpecialization
    professional_specializations = db.relationship('ProfessionalSpecialization', back_populates='healthcare_professional')

    # Many-to-many relationship with Specialization through ProfessionalSpecialization
    specializations = db.relationship('Specialization', secondary='professional_specializations', back_populates='healthcare_professionals')

    # One-to-many relationship with Appointments
    appointments = db.relationship('Appointment', backref='healthcare_professional', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone_number': self.phone_number,
            'specializations': [specialization.name for specialization in self.specializations]
        }


# Specialization Table
class Specialization(db.Model):
    __tablename__ = 'specializations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(255))

    # Many-to-many relationship with HealthcareProfessional through ProfessionalSpecialization
    healthcare_professionals = db.relationship('HealthcareProfessional', secondary='professional_specializations', back_populates='specializations')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }


# ProfessionalSpecialization Table (Bridge Table for Many-to-Many Relationship)
class ProfessionalSpecialization(db.Model):
    __tablename__ = 'professional_specializations'
    id = db.Column(db.Integer, primary_key=True)
    healthcare_professional_id = db.Column(db.Integer, db.ForeignKey('healthcare_professionals.id'), nullable=False)
    specialization_id = db.Column(db.Integer, db.ForeignKey('specializations.id'), nullable=False)

    healthcare_professional = db.relationship('HealthcareProfessional', back_populates='professional_specializations')
    specialization = db.relationship('Specialization', back_populates='professional_specializations')


# Client Table
class Client(db.Model):
    __tablename__ = 'clients'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    phone_number = db.Column(db.String(20))
    address = db.Column(db.String(255))

    # One-to-many relationship with Appointments
    appointments = db.relationship('Appointment', backref='client', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone_number': self.phone_number,
            'address': self.address
        }


# Appointment Table
class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    healthcare_professional_id = db.Column(db.Integer, db.ForeignKey('healthcare_professionals.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    appointment_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='Scheduled')

    healthcare_professional = db.relationship('HealthcareProfessional', backref='appointments')
    client = db.relationship('Client', backref='appointments')

    def to_dict(self):
        return {
            'id': self.id,
            'healthcare_professional': self.healthcare_professional.name,
            'client': f"{self.client.first_name} {self.client.last_name}",
            'appointment_time': self.appointment_time.strftime('%Y-%m-%d %H:%M:%S'),
            'status': self.status
        }
