
## MedMatch Hospital Management System

MedMatch is a hospital management system designed to streamline hospital operations by managing healthcare professionals, clients, appointments, and specializations. The system allows easy management of hospital staff, patient appointments, and associated medical services.

## Features
- Healthcare Professionals Management: Add, update, delete healthcare professionals, and toggle their active status.

- Clients Management: Add and manage client details.

- Appointments: Schedule and track appointments between clients and healthcare professionals.

- Specializations Management: Manage medical specializations and assign them to healthcare professionals.


## Prerequisites
# Make sure you have the following installed:

- React: Frontend framework for building user interfaces.

- Flask: Backend framework (or any preferred framework for your backend).

- Bootstrap: For responsive UI elements.


## Installation

1. Clone the repository

`git clone https://github.com/your-username/medmatch-hospital-management.git`



2. Install frontend dependencies

*Navigate to the client directory and install required dependencies:*

`cd client`

`npm install`



3. Install backend dependencies

*Navigate to the server directory and install required dependencies:*

`cd server`

*Install the required dependencies using pipenv:*

`pipenv install`

*Activate the virtual environment (shell):*

`pipenv shell`

4. Running the application

Start the frontend (React app)

*Navigate to the client directory and run:*

`npm start`
*The frontend will be available at http://localhost:3000.*

5. Start the backend (Flask app)

*Navigate to the server directory and run:*

`flask run`
*The backend will be available at http://localhost:5000*

## Usage

# Healthcare Professionals:

- Add new healthcare professionals and view their details.
- Toggle status between "Active" and "Inactive".
- View associated specializations for each professional.

# Clients:

- Add, view, and delete clients.
- View client details and manage their data.
- Appointments:

# Schedule appointments with healthcare professionals.

- Track and manage the status of appointments.

# Specializations:

- Manage specializations that healthcare professionals offer.
- Assign specializations to professionals.

## Technologies Used

# Frontend:

- React.js (for building user interfaces)
- React Bootstrap (for responsive design)
- React Router (for page navigation)

# Backend:

- Flask (Python framework)
- SQLite (or another database solution depending on your choice)
- REST API for CRUD operations

# Future Improvements
- User Authentication: Add user login/logout with roles (admin, healthcare professional, etc.)
- Appointment Notifications: Send notifications (email/SMS) for upcoming appointments.
- Patient Management: Add functionality to track patient information and medical history.

# Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-name).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature-name).
5. Create a new Pull Request.

# License
This project is licensed under the MIT License.


## Acknowledgments

- Inspired by various hospital management systems for simplifying medical operations.
- Thanks to [React](https://reactjs.org/), [Flask](https://flask.palletsprojects.com/), and [Bootstrap](https://getbootstrap.com/) for their amazing tools and frameworks.
