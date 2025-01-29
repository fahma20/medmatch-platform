import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HealthcareProfessionals from './Healthcareprofessionals';
import Specializations from './Specializations';
import Appointments from './Appointments';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<h1>Welcome to MedMatch App</h1>} />
          <Route path="/healthcare-professionals" element={<HealthcareProfessionals />} />
          <Route path="/specializations" element={<Specializations />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
