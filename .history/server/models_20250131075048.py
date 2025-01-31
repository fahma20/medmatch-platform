# models.py
# models.py

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Client(db.Model):
    __tablename__ = 'clients'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    
    appointments = db.relationship('Appointment', back_populates='client', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }

class HealthcareProfessional(db.Model):
    __tablename__ = 'healthcare_professionals'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='inactive')  # Add status field (active or inactive)
    
    # Relationship with Appointment
    appointments = db.relationship('Appointment', back_populates='healthcare_professional', lazy=True)
    
    # Relationship with Specialization (many-to-many through ProfessionalSpecialization)
    specializations = db.relationship('Specialization', secondary='professional_specializations', back_populates='healthcare_professionals')

    # Add the relationship to ProfessionalSpecialization
    professional_specializations = db.relationship('ProfessionalSpecialization', back_populates='healthcare_professional')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'status': self.status,
            'specializations': [specialization.to_dict() for specialization in self.specializations]
        }

class Specialization(db.Model):
    __tablename__ = 'specializations'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    
    healthcare_professionals = db.relationship('HealthcareProfessional', secondary='professional_specializations', back_populates='specializations')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

class Appointment(db.Model):
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('healthcare_professionals.id'), nullable=False)
    appointment_date = db.Column(db.DateTime, nullable=False)
    
    client = db.relationship('Client', back_populates='appointments', lazy=True)
    healthcare_professional = db.relationship('HealthcareProfessional', back_populates='appointments', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'client_id': self.client.id,
            'client_name': self.client.name,
            'doctor_id': self.healthcare_professional.id,
            'doctor_name': self.healthcare_professional.name,
            'appointment_date': self.appointment_date.isoformat(),
        }

class ProfessionalSpecialization(db.Model):
    __tablename__ = 'professional_specializations'

    id = db.Column(db.Integer, primary_key=True)
    healthcare_professional_id = db.Column(db.Integer, db.ForeignKey('healthcare_professionals.id'), nullable=False)
    specialization_id = db.Column(db.Integer, db.ForeignKey('specializations.id'), nullable=False)
    status = db.Column(db.String(50), default='Active')  # Store status for this relationship

    healthcare_professional = db.relationship('HealthcareProfessional', back_populates='professional_specializations')
    specialization = db.relationship('Specialization', back_populates='professional_specializations')
