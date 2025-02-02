// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';

const HealthcareProfessional = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch healthcare professionals and their specializations
  useEffect(() => {
    const fetchHealthcareProfessionals = async () => {
      try {
        // Fetch professional_specializations data
        const response = await axios.get('/professional_specializations');
        const professionalSpecializations = response.data;

        // Organize the data by healthcare professionals
        const professionalsData = professionalSpecializations.reduce((acc, ps) => {
          const professionalId = ps.healthcare_professional_id;
          if (!acc[professionalId]) {
            acc[professionalId] = {
              id: professionalId,
              name: ps.healthcare_professional.name,
              specializations: []
            };
          }
          acc[professionalId].specializations.push({
            specialization_name: ps.specialization_name,
            status: ps.status
          });
          return acc;
        }, {});

        setProfessionals(Object.values(professionalsData));
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchHealthcareProfessionals();
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading healthcare professionals...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">
          <strong>{error}</strong>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Healthcare Professionals and Their Specializations</h1>
      <Row>
        {professionals.map((professional) => (
          <Col key={professional.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{professional.name}</Card.Title>
                <h5>Specializations:</h5>
                {professional.specializations.length > 0 ? (
                  professional.specializations.map((specialization, index) => (
                    <Badge
                      key={index}
                      variant={specialization.status === 'Active' ? 'success' : 'danger'}
                      className="mr-2 mb-2"
                    >
                      {specialization.specialization_name} ({specialization.status})
                    </Badge>
                  ))
                ) : (
                  <p>No specializations available</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HealthcareProfessional;
