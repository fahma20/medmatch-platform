# models.py
# models.py
class Client(db.Model):
    __tablename__ = 'clients'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    appointments = db.relationship('Appointment', backref='client_appointments', lazy=True)  # No conflict here

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
    appointments = db.relationship('Appointment', backref='healthcare_professional', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'status': self.status,  # Include status in the dictionary
            'specializations': [specialization.to_dict() for specialization in self.specializations]
        }

class Specialization(db.Model):
    __tablename__ = 'specializations'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

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
    
    client = db.relationship('Client', backref='appointments', lazy=True)  # Ensure client backref is 'appointments'
    healthcare_professional = db.relationship('HealthcareProfessional', backref='appointments_by_professional', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'client_id': self.client.id,
            'client_name': self.client.name,  # Add client name here
            'doctor_id': self.healthcare_professional.id,
            'doctor_name': self.healthcare_professional.name,  # Add doctor name here
            'appointment_date': self.appointment_date.isoformat(),  # Ensure it's a valid ISO format
        }

class ProfessionalSpecialization(db.Model):
    __tablename__ = 'professional_specializations'

    id = db.Column(db.Integer, primary_key=True)
    healthcare_professional_id = db.Column(db.Integer, db.ForeignKey('healthcare_professionals.id'), nullable=False)
    specialization_id = db.Column(db.Integer, db.ForeignKey('specializations.id'), nullable=False)
    status = db.Column(db.String(50), default='Active')  # Store status for this relationship

    healthcare_professional = db.relationship('HealthcareProfessional', backref='professional_specializations')
    specialization = db.relationship('Specialization', backref='professional_specializations')
