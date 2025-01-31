// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Form, Modal } from 'react-bootstrap';

const HealthcareProfessionalList = () => {
  const [professionals, setProfessionals] = useState([]);
  const [newName, setNewName] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Fetch Healthcare Professionals
  const fetchProfessionals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/healthcare_professionals');
      setProfessionals(response.data);
    } catch (error) {
      console.error('Error fetching professionals:', error);
    }
  };

  // Add Healthcare Professional
  const addProfessional = async () => {
    if (!newName) {
      alert('Name is required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/healthcare_professionals', {
        name: newName,
      });
      setProfessionals([...professionals, response.data]);
      setNewName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error adding professional:', error);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Healthcare Professionals</Card.Title>
        <Button variant="primary" onClick={() => setShowModal(true)}>Add Professional</Button>
        <ul className="list-group mt-3">
          {professionals.map((professional) => (
            <li key={professional.id} className="list-group-item">{professional.name}</li>
          ))}
        </ul>
      </Card.Body>

      {/* Modal for adding a new professional */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Healthcare Professional</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="professionalName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={addProfessional}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default HealthcareProfessionalList;
