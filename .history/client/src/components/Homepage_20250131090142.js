import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <section className="hero py-5" style={{ backgroundColor: '#ffffff', color: '#005f73' }}>
        <div className="container text-center">
          <h1 className="display-3 font-weight-bold">Welcome to MedMatch Hospital Management</h1>
          <p className="lead">Manage hospital staff, track appointments, and organize patient data with ease.</p>
          <Link to="/healthcare-professionals" className="btn btn-dark btn-lg">Manage Doctors & Staff</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container text-center">
          <h2 className="font-weight-bold mb-4" style={{ color: '#005f73' }}>Hospital Management Features</h2>
          <div className="row">
            {/* Doctors & Staff Management */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm border-light">
                <div className="card-body">
                  <h4 className="card-title text-dark">Doctors & Staff</h4>
                  <p className="card-text">Manage hospital doctors, staff, their details, and specializations. Perform CRUD operations with ease.</p>
                  <Link to="/healthcare-professionals" className="btn btn-outline-dark">Manage Doctors</Link>
                </div>
              </div>
            </div>

            {/* Specializations Management */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm border-light">
                <div className="card-body">
                  <h4 className="card-title text-dark">Specializations</h4>
                  <p className="card-text">Add, edit, or delete specializations offered by your hospital. Organize and manage services effectively.</p>
                  <Link to="/specializations" className="btn btn-outline-dark">Manage Specializations</Link>
                </div>
              </div>
            </div>

            {/* Appointments Management */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm border-light">
                <div className="card-body">
                  <h4 className="card-title text-dark">Appointments</h4>
                  <p className="card-text">Schedule and manage appointments between patients and healthcare professionals. Ensure smooth operations.</p>
                  <Link to="/appointments" className="btn btn-outline-dark">Manage Appointments</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-light py-5">
        <div className="container text-center">
          <h2 className="font-weight-bold mb-4" style={{ color: '#005f73' }}>What Our Users Say</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm border-light">
                <div className="card-body">
                  <p className="card-text">"MedMatch has been a game changer for our hospital's management. We can now easily manage staff and appointments."</p>
                  <footer className="blockquote-footer">Dr. John Doe, Chief Surgeon</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-light">
                <div className="card-body">
                  <p className="card-text">"The system is incredibly user-friendly, and it has helped our hospital improve communication and efficiency."</p>
                  <footer className="blockquote-footer">Jane Smith, Hospital Administrator</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-light">
                <div className="card-body">
                  <p className="card-text">"Managing appointments and doctors has never been easier. This system is essential for our daily operations."</p>
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
