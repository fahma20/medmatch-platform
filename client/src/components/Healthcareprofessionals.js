// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Card, ListGroup, Collapse, Spinner, Alert, ToggleButtonGroup, ToggleButton, FormCheck } from 'react-bootstrap';
import { Switch } from 'react-bootstrap';

const HealthcareProfessional = () => {
  const [professionals, setProfessionals] = useState([]);
  const [newProfessionalName, setNewProfessionalName] = useState('');
  const [newSpecializationName, setNewSpecializationName] = useState('');
  const [newSpecializationStatus, setNewSpecializationStatus] = useState('Active');
  const [editingProfessional, setEditingProfessional] = useState(null);
  const [open, setOpen] = useState({}); // For toggling the specialization list visibility
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHealthcareProfessionals();
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

  const handleAddSpecialization = async (professionalId) => {
    const newSpec = {
      healthcare_professional_id: professionalId,
      specialization_name: newSpecializationName,
      status: newSpecializationStatus,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/professional_specializations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpec),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedProfessionals = professionals.map((professional) => {
          if (professional.id === professionalId) {
            return {
              ...professional,
              specializations: [...professional.specializations, data],
            };
          }
          return professional;
        });
        setProfessionals(updatedProfessionals);
        setNewSpecializationName('');
        setNewSpecializationStatus('Active');
      }
    } catch (error) {
      console.error('Error adding specialization', error);
    }
  };

  const handleStatusChange = (value) => {
    setNewSpecializationStatus(value);
  };

  const handleStatusToggle = (professionalId, specializationId) => {
    setProfessionals(professionals.map(professional => {
      if (professional.id === professionalId) {
        return {
          ...professional,
          specializations: professional.specializations.map(specialization => {
            if (specialization.id === specializationId) {
              return {
                ...specialization,
                status: specialization.status === 'Active' ? 'Inactive' : 'Active'
              };
            }
            return specialization;
          })
        };
      }
      return professional;
    }));
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
                        <ListGroup.Item key={specialization.id}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span>{specialization.specialization_name} - {specialization.status}</span>
                            <FormCheck
                              type="switch"
                              id={`status-switch-${specialization.id}`}
                              label={specialization.status === 'Active' ? 'Active' : 'Inactive'}
                              checked={specialization.status === 'Active'}
                              onChange={() => handleStatusToggle(professional.id, specialization.id)}
                            />
                          </div>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <ListGroup.Item>No Specializations</ListGroup.Item>
                    )}
                  </ListGroup>
                </Collapse>

                {/* Add New Specialization Form (Visible only for specific doctor) */}
                <div className="mt-4">
                  <Form onSubmit={(e) => { e.preventDefault(); handleAddSpecialization(professional.id); }}>
                    <Form.Group>
                      <Form.Label>New Specialization</Form.Label>
                      <Form.Control
                        type="text"
                        value={newSpecializationName}
                        onChange={(e) => setNewSpecializationName(e.target.value)}
                        placeholder="Enter specialization name"
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <ToggleButtonGroup
                        type="radio"
                        name="status"
                        value={newSpecializationStatus}
                        onChange={handleStatusChange}
                        required
                      >
                        <ToggleButton id="tbg-radio-1" value="Active">
                          Active
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-2" value="Inactive">
                          Inactive
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Add Specialization
                    </Button>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default HealthcareProfessional;
