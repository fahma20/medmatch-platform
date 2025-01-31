import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HealthcareProfessionalList from './HealthcareProfessionalList';
import Appointments from './Appointments';
import ClientList from './ClientList';
import Homepage from './Homepage';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/healthcare-professionals" element={<HealthcareProfessionalList />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/clients" element={<ClientList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
