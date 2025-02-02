// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(to right, #005f73, #0a9396)' }}>
      <div className="container">
        <Link className="navbar-brand text-white font-weight-bold" to="/">MEDMATCH</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-3">
              <Link 
                className="nav-link text-white p-3 border rounded" 
                style={{ 
                  backgroundColor: '#000000', // Black background 
                  borderColor: '#333', // Dark border color
                  borderRadius: '20px', // Smooth corners
                  transition: 'background-color 0.3s ease' // Smooth transition on hover
                }} 
                to="/healthcare-professionals">
                Healthcare Professionals
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link 
                className="nav-link text-white p-3 border rounded" 
                style={{ 
                  backgroundColor: '#000000', // Black background 
                  borderColor: '#333', // Dark border color
                  borderRadius: '20px', // Smooth corners
                  transition: 'background-color 0.3s ease' // Smooth transition on hover
                }} 
                to="/clients">
                Clients
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link 
                className="nav-link text-white p-3 border rounded" 
                style={{ 
                  backgroundColor: '#000000', // Black background 
                  borderColor: '#333', // Dark border color
                  borderRadius: '20px', // Smooth corners
                  transition: 'background-color 0.3s ease' // Smooth transition on hover
                }} 
                to="/appointments">
                Appointments
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link 
                className="nav-link text-white p-3 border rounded" 
                style={{ 
                  backgroundColor: '#000000', // Black background 
                  borderColor: '#333', // Dark border color
                  borderRadius: '20px', // Smooth corners
                  transition: 'background-color 0.3s ease' // Smooth transition on hover
                }} 
                to="/specializations">
                Specializations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
