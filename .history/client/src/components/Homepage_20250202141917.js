import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <section
        className="hero py-5 text-white"
        style={{
          background: 'linear-gradient(to right, #005f73, #0a9396)',
          color: '#ffffff',
          borderRadius: '10px',
        }}
      >
        <div className="container text-center">
          <h1 className="display-3 font-weight-bold mb-4">
            Welcome to MedMatch Hospital Management
          </h1>
          <p className="lead mb-4">
            Manage hospital staff, track appointments, and organize patient data with ease.
          </p>
          <Link to="/healthcare-professionals" className="btn btn-light btn-lg shadow-lg">
            Manage Doctors & Staff
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container text-center">
          <h2
            className="font-weight-bold mb-5"
            style={{ color: '#005f73', fontSize: '2.5rem' }}
          >
            Hospital Management Features
          </h2>
          <div className="row">
            {/* Doctors & Staff Management */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-body">
                  <h4 className="card-title text-dark mb-3">Doctors & Staff</h4>
                  <p className="card-text text-muted mb-4">
                    Manage hospital doctors, staff, their details, and specializations. Perform CRUD operations with ease.
                  </p>
                  <Link to="/healthcare-professionals" className="btn btn-outline-dark btn-lg">
                    Manage Doctors
                  </Link>
                </div>
              </div>
            </div>

            {/* Specializations Management */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-body">
                  <h4 className="card-title text-dark mb-3">Specializations</h4>
                  <p className="card-text text-muted mb-4">
                    Add, edit, or delete specializations offered by your hospital. Organize and manage services effectively.
                  </p>
                  <Link to="/specializations" className="btn btn-outline-dark btn-lg">
                    Manage Specializations
                  </Link>
                </div>
              </div>
            </div>

            {/* Appointments Management */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-body">
                  <h4 className="card-title text-dark mb-3">Appointments</h4>
                  <p className="card-text text-muted mb-4">
                    Schedule and manage appointments between patients and healthcare professionals. Ensure smooth operations.
                  </p>
                  <Link to="/appointments" className="btn btn-outline-dark btn-lg">
                    Manage Appointments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-light py-5">
        <div className="container text-center">
          <h2 className="font-weight-bold mb-5" style={{ color: '#005f73' }}>
            What Our Users Say
          </h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-lg border-0 rounded-lg mb-4">
                <div className="card-body">
                  <p className="card-text">
                    "MedMatch has been a game changer for our hospital's management. We can now easily manage staff and appointments."
                  </p>
                  <footer className="blockquote-footer">Dr. John Doe, Chief Surgeon</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-lg border-0 rounded-lg mb-4">
                <div className="card-body">
                  <p className="card-text">
                    "The system is incredibly user-friendly, and it has helped our hospital improve communication and efficiency."
                  </p>
                  <footer className="blockquote-footer">Jane Smith, Hospital Administrator</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-lg border-0 rounded-lg mb-4">
                <div className="card-body">
                  <p className="card-text">
                    "Managing appointments and doctors has never been easier. This system is essential for our daily operations."
                  </p>
                  <footer className="blockquote-footer">Mary Johnson, HR Manager</footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p>&copy; 2025 MedMatch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
