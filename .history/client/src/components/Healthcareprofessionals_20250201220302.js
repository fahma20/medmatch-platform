// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Card, ListGroup, Collapse } from 'react-bootstrap';

const HealthcareProfessional = () => {
  const [professionals, setProfessionals] = useState([]);
  const [newProfessionalName, setNewProfessionalName] = useState('');
  const [editingProfessional, setEditingProfessional] = useState(null);
  const [open, setOpen] = useState({}); // For toggling the specialization list visibility

  useEffect(() => {
    // Fetch healthcare professionals and their specializations
    fetchHealthcareProfessionals();
  }, []);

  const fetchHealthcareProfessionals = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/healthcare_professionals');
      const data = await response.json();
      setProfessionals(data);
    } catch (error) {
      console.error('Error fetching healthcare professionals', error);
    }
  };

  const handleAddProfessional = async (e) => {
    e.preventDefault();
    const newProfessional = { name: newProfessionalName };
    try {
      const response = await fetch('http://127.0.0.1:5000/api/healthcare_professionals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfessional),
      });
      if (response.ok) {
        const data = await response.json();
        setProfessionals([...professionals, data]);
        setNewProfessionalName('');
      }
    } catch (error) {
      console.error('Error adding healthcare professional', error);
    }
  };

  const handleDeleteProfessional = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/healthcare_professionals/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProfessionals(professionals.filter((professional) => professional.id !== id));
      }
    } catch (error) {
      console.error('Error deleting healthcare professional', error);
    }
  };

  const handleEditProfessional = (professional) => {
    setEditingProfessional(professional);
    setNewProfessionalName(professional.name);
  };

  const handleUpdateProfessional = async () => {
    const updatedProfessional = { name: newProfessionalName };
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/healthcare_professionals/${editingProfessional.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfessional),
      });
      if (response.ok) {
        const data = await response.json();
        setProfessionals(
          professionals.map((professional) =>
            professional.id === editingProfessional.id ? data : professional
          )
        );
        setEditingProfessional(null);
        setNewProfessionalName('');
      }
    } catch (error) {
      console.error('Error updating healthcare professional', error);
    }
  };

  const handleToggleSpecializations = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">{editingProfessional ? 'Edit Healthcare Professional' : 'Add Healthcare Professional'}</h2>

      {/* Add or Edit Professional Form */}
      <Form onSubmit={editingProfessional ? handleUpdateProfessional : handleAddProfessional}>
        <Form.Group>
          <Form.Label>Healthcare Professional Name</Form.Label>
          <Form.Control
            type="text"
            value={newProfessionalName}
            onChange={(e) => setNewProfessionalName(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant={editingProfessional ? 'warning' : 'primary'}>
          {editingProfessional ? 'Update' : 'Add'}
        </Button>
        {editingProfessional && (
          <Button variant="secondary" onClick={() => setEditingProfessional(null)} className="ml-2">
            Cancel
          </Button>
        )}
      </Form>

      {/* List of Healthcare Professionals */}
      <div className="mt-4">
        <h3>Healthcare Professionals</h3>
        {professionals.length === 0 ? (
          <p>No healthcare professionals available.</p>
        ) : (
          professionals.map((professional) => (
            <Card key={professional.id} className="mb-3 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">{professional.name}</h5>
                  <div>
                    <Button variant="warning" onClick={() => handleEditProfessional(professional)} className="mr-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteProfessional(professional.id)}>
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Specializations */}
                <Button variant="link" onClick={() => handleToggleSpecializations(professional.id)} aria-expanded={open[professional.id] ? 'true' : 'false'}>
                  {open[professional.id] ? 'Hide Specializations' : 'Show Specializations'}
                </Button>

                <Collapse in={open[professional.id]}>
                  <ListGroup className="mt-3">
                    {professional.specializations && professional.specializations.length > 0 ? (
                      professional.specializations.map((specialization) => (
                        <ListGroup.Item key={specialization.id}>{specialization.name}</ListGroup.Item>
                      ))
                    ) : (
                      <ListGroup.Item>No Specializations</ListGroup.Item>
                    )}
                  </ListGroup>
                </Collapse>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default HealthcareProfessional;
