import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import HealthcareProfessionals from './Healthcareprofessionals'; // Ensure the correct name and casing
import Specializations from './Specializations';
import Appointments from './A';
import Clients from './Clients';
import Navbar from './Navbar';
import HomePage from './HomePage'; // Corrected import to HomePage

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Your Navbar component */}
      <div className="container mt-5">
        <Routes>
          {/* Add HomePage as the route for the root path */}
          <Route path="/" element={<HomePage />} /> {/* Home Page */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/specializations" element={<Specializations />} />
          <Route path="/healthcare-professionals" element={<HealthcareProfessionals />} /> {/* Healthcare Professionals Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
