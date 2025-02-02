// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Card, ListGroup, Collapse, Spinner, Alert } from 'react-bootstrap';

const HealthcareProfessional = () => {
  const [professionals, setProfessionals] = useState([]);
  const [newProfessionalName, setNewProfessionalName] = useState('');
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
      <h2 className="mb-4 text-center">Healthcare Professionals</h2>

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
                </div>

                {/* Specializations */}
                <h6>Specializations:</h6>
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
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default HealthcareProfessional;
