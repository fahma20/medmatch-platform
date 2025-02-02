// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { Button, Form, Card, ListGroup, Collapse, Spinner, Alert } from 'react-bootstrap';

const HealthcareProfessional = () => {
  const [professionals, setProfessionals] = useState([]);
  const [newProfessionalName, setNewProfessionalName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState({});

  useEffect(() => {
    fetchHealthcareProfessionals();
  }, []);

  // Fetch healthcare professionals, including their specializations
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

  // Add new healthcare professional
  const handleAddProfessional = async () => {
    const newProfessional = { name: newProfessionalName, status: 'Active' }; // New professionals will be active by default
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

  // Toggle the status of a healthcare professional
  const handleToggleStatus = async (id, currentStatus) => {
    const updatedStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'; // Toggle status
    // Update the local state immediately for better UX
    setProfessionals((prevProfessionals) =>
      prevProfessionals.map((professional) =>
        professional.id === id ? { ...professional, status: updatedStatus } : professional
      )
    );

    // Make API request to update the status on the server
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/healthcare_professionals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedStatus }), // Send the updated status here
      });

      if (!response.ok) {
        // If the status update failed, revert the status in the UI back to its original state
        setProfessionals((prevProfessionals) =>
          prevProfessionals.map((professional) =>
            professional.id === id ? { ...professional, status: currentStatus } : professional
          )
        );
      }
    } catch (error) {
      console.error('Error toggling doctor status', error);
      // If there's an error, revert the status in the UI back to its original state
      setProfessionals((prevProfessionals) =>
        prevProfessionals.map((professional) =>
          professional.id === id ? { ...professional, status: currentStatus } : professional
        )
      );
    }
  };

  // Toggle the status of a specialization
  const handleToggleSpecializationStatus = async (professionalId, specializationId, currentStatus) => {
    const updatedStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'; // Toggle specialization status
    // Update the local state immediately for better UX
    setProfessionals((prevProfessionals) =>
      prevProfessionals.map((professional) =>
        professional.id === professionalId
          ? {
              ...professional,
              specializations: professional.specializations.map((specialization) =>
                specialization.id === specializationId
                  ? { ...specialization, status: updatedStatus }
                  : specialization
              ),
            }
          : professional
      )
    );

    // Make API request to update the specialization status on the server
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/specializations/${specializationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedStatus }), // Send the updated status here
      });

      if (!response.ok) {
        // If the status update failed, revert the status in the UI back to its original state
        setProfessionals((prevProfessionals) =>
          prevProfessionals.map((professional) =>
            professional.id === professionalId
              ? {
                  ...professional,
                  specializations: professional.specializations.map((specialization) =>
                    specialization.id === specializationId
                      ? { ...specialization, status: currentStatus }
                      : specialization
                  ),
                }
              : professional
          )
        );
      }
    } catch (error) {
      console.error('Error toggling specialization status', error);
      // If there's an error, revert the status in the UI back to its original state
      setProfessionals((prevProfessionals) =>
        prevProfessionals.map((professional) =>
          professional.id === professionalId
            ? {
                ...professional,
                specializations: professional.specializations.map((specialization) =>
                  specialization.id === specializationId
                    ? { ...specialization, status: currentStatus }
                    : specialization
                ),
              }
            : professional
        )
      );
    }
  };

  // Delete a healthcare professional
  const handleDeleteProfessional = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/healthcare_professionals/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProfessionals((prevProfessionals) =>
          prevProfessionals.filter((professional) => professional.id !== id)
        );
      }
    } catch (error) {
      console.error('Error deleting healthcare professional', error);
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
      {/* Heading for the page */}
      <h2 className="mb-4 text-center text-dark font-weight-bold" style={{ fontSize: '2rem' }}>
        Healthcare Professionals
      </h2>

      {/* Add Healthcare Professional Form */}
      <Form>
        <Form.Group>
          <Form.Label>Healthcare Professional Name</Form.Label>
          <Form.Control
            type="text"
            value={newProfessionalName}
            onChange={(e) => setNewProfessionalName(e.target.value)}
            required
            style={{ fontSize: '1rem' }} // Readable font size
          />
        </Form.Group>

        {/* Add Button with Teal Color */}
        <Button
          type="button"
          variant="success"
          onClick={handleAddProfessional}
          style={{
            width: '100%',
            backgroundColor: '#008080', // Teal color
            borderColor: '#008080',
          }}
        >
          Add Healthcare Professional
        </Button>
      </Form>

      {/* Healthcare Professionals List */}
      <div className="mt-4">
        <h3 className="text-dark" style={{ fontSize: '1.5rem' }}>List of Healthcare Professionals</h3>
        {professionals.length === 0 ? (
          <p>No healthcare professionals available.</p>
        ) : (
          professionals.map((professional) => (
            <Card key={professional.id} className="mb-3 shadow-sm" style={{ backgroundColor: '#f7f7f7' }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title" style={{ color: '#333' }}>{professional.name}</h5>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProfessional(professional.id)}
                    style={{ backgroundColor: '#ff6f61', borderColor: '#ff6f61' }}
                  >
                    Delete
                  </Button>
                </div>

                {/* Toggle Professional Status */}
                <div className="d-flex align-items-center">
                  <label className="mr-2">Status: </label>
                  <Switch
                    checked={professional.status === 'Active'}
                    onChange={() => handleToggleStatus(professional.id, professional.status)}
                    offColor="#d9534f"
                    onColor="#008080" // Teal for active
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={20}
                    width={48}
                  />
                </div>

                {/* Specializations Toggle Button */}
                <Button
                  variant="link"
                  className="mt-3"
                  onClick={() => setOpen((prevState) => ({ ...prevState, [professional.id]: !prevState[professional.id] }))}
                  style={{ color: '#008080' }} // Teal link button
                >
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
                          {/* Toggle Specialization Status */}
                          <Switch
                            checked={specialization.status === 'Active'}
                            onChange={() => handleToggleSpecializationStatus(professional.id, specialization.id, specialization.status)}
                            offColor="#d9534f"
                            onColor="#008080" // Teal for active
                            checkedIcon={false}
                            uncheckedIcon={false}
                            height={20}
                            width={48}
                          />
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
