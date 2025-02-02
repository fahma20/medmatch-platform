// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { Button, Form, Card, ListGroup, Collapse, Spinner, Alert } from 'react-bootstrap';

const HealthcareProfessional = () => {
  const [professionals, setProfessionals] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [newProfessionalName, setNewProfessionalName] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [editingProfessional, setEditingProfessional] = useState(null);
  const [open, setOpen] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHealthcareProfessionals();
    fetchSpecializations();
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
        setSelectedSpecializations([]);
      }
    } catch (error) {
      console.error('Error adding healthcare professional', error);
    }
  };

  const handleToggleStatus = async (id, status) => {
    const updatedStatus = status === 'Active' ? 'Inactive' : 'Active';
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/healthcare_professionals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedStatus }),
      });

      if (response.ok) {
        const updatedProfessional = await response.json();
        setProfessionals((prevProfessionals) =>
          prevProfessionals.map((professional) =>
            professional.id === id ? updatedProfessional : professional
          )
        );
      }
    } catch (error) {
      console.error('Error toggling doctor status', error);
    }
  };

  const handleDeleteSpecialization = async (doctorId, specializationId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/professional_specializations/${specializationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the list of specializations for the doctor
        setProfessionals((prevProfessionals) =>
          prevProfessionals.map((professional) =>
            professional.id === doctorId
              ? {
                  ...professional,
                  specializations: professional.specializations.filter(
                    (specialization) => specialization.id !== specializationId
                  ),
                }
              : professional
          )
        );
      }
    } catch (error) {
      console.error('Error deleting specialization', error);
    }
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

      <Form onSubmit={editingProfessional ? handleAddProfessional : handleAddProfessional}>
        <Form.Group>
          <Form.Label>Healthcare Professional Name</Form.Label>
          <Form.Control
            type="text"
            value={newProfessionalName}
            onChange={(e) => setNewProfessionalName(e.target.value)}
            required
          />
        </Form.Group>

        {/* Show specialization selection only when adding new professional */}
        {!editingProfessional && (
          <Form.Group>
            <Form.Label>Select Specializations</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={selectedSpecializations}
              onChange={(e) => setSelectedSpecializations([...e.target.selectedOptions].map(option => option.value))}
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

      {/* Doctors List */}
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
                    <Button variant="light" onClick={() => { setEditingProfessional(professional); setNewProfessionalName(professional.name); }} className="mr-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleAddProfessional(professional.id)}>
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Toggle Doctor's Status */}
                <div className="d-flex align-items-center">
                  <label className="mr-2">Status: </label>
                  <Switch
                    checked={professional.status === 'Active'}
                    onChange={() => handleToggleStatus(professional.id, professional.status)}
                    offColor="#d9534f"
                    onColor="#5bc0de"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={20}
                    width={48}
                  />
                </div>

                <Button variant="link" onClick={() => setOpen((prevState) => ({ ...prevState, [professional.id]: !prevState[professional.id] }))} aria-expanded={open[professional.id] ? 'true' : 'false'}>
                  {open[professional.id] ? 'Hide Specializations' : 'Show Specializations'}
                </Button>

                <Collapse in={open[professional.id]}>
                  <ListGroup className="mt-3">
                    {professional.specializations && professional.specializations.length > 0 ? (
                      professional.specializations.map((specialization) => (
                        <ListGroup.Item key={specialization.id}>
                          {specialization.specialization_name}
                          <span className={`badge ml-2 ${specialization.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                            {specialization.status}
                          </span>
                          {/* Button to delete specialization */}
                          <Button variant="danger" size="sm" onClick={() => handleDeleteSpecialization(professional.id, specialization.id)} className="ml-2">
                            Delete
                          </Button>
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
