import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <section className="hero bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-3 font-weight-bold">Welcome to MedMatch</h1>
          <p className="lead">Find and schedule your appointments with healthcare professionals easily.</p>
          <Link to="/healthcare-professionals" className="btn btn-light btn-lg">Browse Professionals</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5">
        <div className="container text-center">
          <h2 className="font-weight-bold mb-4">Features</h2>
          <div className="row">
            {/* Healthcare Professionals Feature */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title text-primary">Healthcare Professionals</h4>
                  <p className="card-text">Browse through a list of qualified healthcare professionals and view their specialties.</p>
                  <Link to="/healthcare-professionals" className="btn btn-outline-primary">View Professionals</Link>
                </div>
              </div>
            </div>

            {/* Appointments Feature */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title text-primary">Appointments</h4>
                  <p className="card-text">Schedule appointments with professionals and manage your health seamlessly.</p>
                  <Link to="/appointments" className="btn btn-outline-primary">Manage Appointments</Link>
                </div>
              </div>
            </div>

            {/* Clients Feature */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title text-primary">Clients</h4>
                  <p className="card-text">Add and manage your personal information as a client easily.</p>
                  <Link to="/clients" className="btn btn-outline-primary">Manage Clients</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-light py-5">
        <div className="container text-center">
          <h2 className="font-weight-bold mb-4">What Our Users Say</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <p className="card-text">"MedMatch made it so easy to find the right doctor and schedule an appointment. Highly recommend!"</p>
                  <footer className="blockquote-footer">John Doe</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <p className="card-text">"The interface is so user-friendly. I was able to find a healthcare professional in no time."</p>
                  <footer className="blockquote-footer">Jane Smith</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <p className="card-text">"Scheduling appointments has never been this easy. Great job, MedMatch team!"</p>
                  <footer className="blockquote-footer">Mary Johnson</footer>
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
