# routes.py

from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from .models import db, HealthcareProfessional, Specialization, Appointment, Client

# Initialize the API Blueprint
api_bp = Blueprint('api', __name__)

# Create the API object
api = Api(api_bp)

# Clients Resource
class ClientResource(Resource):
    # Read (All Items)
    def get(self):
        clients = Client.query.all()
        return jsonify([client.to_dict() for client in clients])

    # Create (Single Client)
    def post(self):
        data = request.get_json()
        if not data.get('name') or not data.get('email'):
            return jsonify({"error": "Name and Email are required"}), 400
        
        new_client = Client(name=data['name'], email=data['email'])
        try:
            db.session.add(new_client)
            db.session.commit()  # Ensure commit is successful
            return jsonify(new_client.to_dict()), 201
        except Exception as e:
            db.session.rollback()  # Rollback on error
            return jsonify({"error": str(e)}), 500

    # Update (Single Client)
    def put(self, id):
        client = Client.query.get_or_404(id)
        data = request.get_json()

        if 'name' in data:
            client.name = data['name']
        if 'email' in data:
            client.email = data['email']

        try:
            db.session.commit()  # Ensure commit is successful
            return jsonify(client.to_dict())
        except Exception as e:
            db.session.rollback()  # Rollback on error
            return jsonify({"error": str(e)}), 500

    # Delete (Single Client)
    def delete(self, id):
        client = Client.query.get_or_404(id)
        try:
            db.session.delete(client)
            db.session.commit()  # Ensure commit is successful
            return jsonify({"message": f"Client with ID {id} deleted."})
        except Exception as e:
            db.session.rollback()  # Rollback on error
            return jsonify({"error": str(e)}), 500

class HealthcareProfessionalResource(Resource):
    # Read (All Items or Single Item)
    def get(self, id=None):
        if id:
            professional = HealthcareProfessional.query.options(joinedload(HealthcareProfessional.specializations)).get_or_404(id)
            return jsonify(professional.to_dict())  # No need to wrap in a list for single item
        professionals = HealthcareProfessional.query.options(joinedload(HealthcareProfessional.specializations)).all()
        return jsonify([professional.to_dict() for professional in professionals])  # Ensure specializations are included

    # Create (Single Healthcare Professional)
    def post(self):
        data = request.get_json()
        if not data.get('name'):
            return jsonify({"error": "Name is required"}), 400
        new_professional = HealthcareProfessional(name=data['name'], status=data.get('status', 'inactive'))  # Set status if provided
        db.session.add(new_professional)
        db.session.commit()
        return jsonify(new_professional.to_dict()), 201

    # Update (Single Healthcare Professional)
class HealthcareProfessionalResource(Resource):
    def put(self, id):
        professional = HealthcareProfessional.query.get_or_404(id)
        data = request.get_json()

        # Assuming you are updating the status for all specializations of a given professional
        if 'status' in data:
            # You may want to update status for all specializations related to this professional
            for specialization in professional.specializations:
                # Find the record in the association table (professional_specializations)
                association = db.session.query(ProfessionalSpecialization).filter(
                    ProfessionalSpecialization.healthcare_professional_id == professional.id,
                    ProfessionalSpecialization.specialization_id == specialization.id
                ).first()

                if association:
                    association.status = data['status']
                    db.session.commit()

        # Return the updated professional and associated specializations
        return jsonify(professional.to_dict())

# Specialization Resource
class SpecializationResource(Resource):
    # Read (All Specializations)
    def get(self):
        specializations = Specialization.query.all()
        return jsonify([specialization.to_dict() for specialization in specializations])

    # Create (Single Specialization)
    def post(self):
        data = request.get_json()
        if not data.get('name'):
            return jsonify({"error": "Name is required"}), 400
        new_specialization = Specialization(name=data['name'])
        db.session.add(new_specialization)
        db.session.commit()
        return jsonify(new_specialization.to_dict()), 201

    # Update (Single Specialization)
    def put(self, id):
        specialization = Specialization.query.get_or_404(id)
        data = request.get_json()
        if 'name' in data:
            specialization.name = data['name']
        db.session.commit()
        return jsonify(specialization.to_dict())

    # Delete (Single Specialization)
    def delete(self, id):
        specialization = Specialization.query.get_or_404(id)
        db.session.delete(specialization)
        db.session.commit()
        return jsonify({"message": f"Specialization with ID {id} deleted."})

# Appointment Resource
class AppointmentResource(Resource):
    # Read (All Appointments)
    def get(self):
        appointments = Appointment.query.all()
        return jsonify([appointment.to_dict() for appointment in appointments])

    # Create (Single Appointment)
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

    # Update (Single Appointment)
    def put(self, id):
        appointment = Appointment.query.get_or_404(id)
        data = request.get_json()
        if 'date' in data:
            appointment.date = data['date']
        if 'time' in data:
            appointment.time = data['time']
        db.session.commit()
        return jsonify(appointment.to_dict())

    # Delete (Single Appointment)
    def delete(self, id):
        appointment = Appointment.query.get_or_404(id)
        db.session.delete(appointment)
        db.session.commit()
        return jsonify({"message": f"Appointment with ID {id} deleted."})

# Register Resources with the API
api.add_resource(ClientResource, '/clients', '/clients/<int:id>')  # Client Resource
api.add_resource(HealthcareProfessionalResource, '/healthcare_professionals', '/healthcare_professionals/<int:id>')  # Healthcare Professional Resource
api.add_resource(SpecializationResource, '/specializations', '/specializations/<int:id>')  # Specialization Resource
api.add_resource(AppointmentResource, '/appointments', '/appointments/<int:id>')  # Appointment Resource

