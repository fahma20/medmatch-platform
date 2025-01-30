import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HealthcareProfessionals from './Healthcareprofessionals';
import Specializations from './Specializations';
import Appointments from './Appointments';
import Clients from './Clients';
import Navbar from './Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes> {/* Replace Switch with Routes */}
          <Route path="/" element={<HealthcareProfessionals />} /> {/* Use 'element' prop */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/specializations" element={<Specializations />} /> {/* Add Route for Specializations */}
        </Routes>
      </div>
    </Router>
  );
};
export default App;