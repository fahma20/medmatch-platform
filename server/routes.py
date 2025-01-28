from flask_restful import Resource
from flask import request, jsonify
from .models import db, HealthcareProfessional, Specialization, Appointment

# HealthcareProfessional Resource
class HealthcareProfessionalResource(Resource):
    # Read (Single Item)
    def get(self, id=None):
        if id:
            professional = HealthcareProfessional.query.get_or_404(id)
            return jsonify(professional.to_dict())
        professionals = HealthcareProfessional.query.all()
        return jsonify([professional.to_dict() for professional in professionals])

    # Create
    def post(self):
        data = request.get_json()
        if not data.get('name'):
            return jsonify({"error": "Name is required"}), 400
        new_professional = HealthcareProfessional(name=data['name'])
        db.session.add(new_professional)
        db.session.commit()
        return jsonify(new_professional.to_dict()), 201

    # Update
    def put(self, id):
        professional = HealthcareProfessional.query.get_or_404(id)
        data = request.get_json()
        if 'name' in data:
            professional.name = data['name']
        db.session.commit()
        return jsonify(professional.to_dict())

    # Delete
    def delete(self, id):
        professional = HealthcareProfessional.query.get_or_404(id)
        db.session.delete(professional)
        db.session.commit()
        return jsonify({"message": f"Healthcare professional with ID {id} deleted."})

# Specialization Resource
class SpecializationResource(Resource):
    # Read (All Items)
    def get(self):
        specializations = Specialization.query.all()
        return jsonify([specialization.to_dict() for specialization in specializations])

    # Create
    def post(self):
        data = request.get_json()
        if not data.get('name'):
            return jsonify({"error": "Name is required"}), 400
        new_specialization = Specialization(name=data['name'])
        db.session.add(new_specialization)
        db.session.commit()
        return jsonify(new_specialization.to_dict()), 201

    # Update
    def put(self, id):
        specialization = Specialization.query.get_or_404(id)
        data = request.get_json()
        if 'name' in data:
            specialization.name = data['name']
        db.session.commit()
        return jsonify(specialization.to_dict())

    # Delete
    def delete(self, id):
        specialization = Specialization.query.get_or_404(id)
        db.session.delete(specialization)
        db.session.commit()
        return jsonify({"message": f"Specialization with ID {id} deleted."})

# Appointments Resource (Full CRUD)
class AppointmentResource(Resource):
    # Read (All Items)
    def get(self):
        appointments = Appointment.query.all()
        return jsonify([appointment.to_dict() for appointment in appointments])

    # Create
    def post(self):
        data = request.get_json()
        if not data.get('date') or not data.get('time') or not data.get('client_id') or not data.get('healthcare_professional_id'):
            return jsonify({"error": "All fields (date, time, client_id, healthcare_professional_id) are required"}), 400
        new_appointment = Appointment(
            date=data['date'],
            time=data['time'],
            client_id=data['client_id'],
            healthcare_professional_id=data['healthcare_professional_id']
        )
        db.session.add(new_appointment)
        db.session.commit()
        return jsonify(new_appointment.to_dict()), 201

    # Update
    def put(self, id):
        appointment = Appointment.query.get_or_404(id)
        data = request.get_json()
        if 'date' in data:
            appointment.date = data['date']
        if 'time' in data:
            appointment.time = data['time']
        db.session.commit()
        return jsonify(appointment.to_dict())

    # Delete
    def delete(self, id):
        appointment = Appointment.query.get_or_404(id)
        db.session.delete(appointment)
        db.session.commit()
        return jsonify({"message": f"Appointment with ID {id} deleted."})

# Register Resources with the API
api.add_resource(HealthcareProfessionalResource, '/healthcare_professionals', '/healthcare_professionals/<int:id>')
api.add_resource(SpecializationResource, '/specializations', '/specializations/<int:id>')
api.add_resource(AppointmentResource, '/appointments', '/appointments/<int:id>')
