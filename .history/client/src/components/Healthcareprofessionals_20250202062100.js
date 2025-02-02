// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Card, ListGroup, Collapse, Spinner, Alert } from 'react-bootstrap';

const HealthcareProfessional = () => {
  const [professionals, setProfessionals] = useState([]);
  const [specializations, setSpecializations] = useState([]); // Holds all available specializations
  const [newProfessionalName, setNewProfessionalName] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState([]); // Holds selected specializations for a new doctor
  const [editingProfessional, setEditingProfessional] = useState(null);
  const [open, setOpen] = useState({}); // For toggling the specialization list visibility
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHealthcareProfessionals();
    fetchSpecializations(); // Fetch all specializations for the dropdown
  }, []);

  const fetchHealthcareProfessionals = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/healthcare_professionals');
      const data = await response.json();
      setProfessionals(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching healthcare professionals');
      setLoading(false);
    }
  };

  const fetchSpecializations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/specializations');
      const data = await response.json();
      setSpecializations(data);
    } catch (error) {
      setError('Error fetching specializations');
    }
  };

  const handleAddProfessional = async (e) => {
    e.preventDefault();
    const newProfessional = { name: newProfessionalName, specializations: selectedSpecializations };

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
        setSelectedSpecializations([]); // Clear specializations after submitting
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

  const handleSpecializationChange = (e) => {
    const { options } = e.target;
    const values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setSelectedSpecializations(values);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading healthcare professionals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">
          <strong>{error}</strong>
        </Alert>
      </div>
    );
  }

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

        {/* Specialization Dropdown for Adding New Doctor */}
        {!editingProfessional && (
          <Form.Group>
            <Form.Label>Select Specializations</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={selectedSpecializations}
              onChange={handleSpecializationChange}
              required
            >
              {specializations.map((specialization) => (
                <option key={specialization.id} value={specialization.id}>
                  {specialization.specialization_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}

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
                    {/* Softer Edit Button */}
                    <Button variant="light" onClick={() => handleEditProfessional(professional)} className="mr-2">
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
                        <ListGroup.Item key={specialization.id}>
                          {specialization.specialization_name} - {specialization.status}
                        </ListGroup.Item>
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
