/*import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Specializations = () => {
    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/specializations')
            .then(response => response.json())
            .then(data => setSpecializations(data))
            .catch(error => console.error('Error fetching specializations:', error));
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('Specialization name is required'),
    });

    const handleAddSpecialization = (values) => {
        fetch('http://localhost:5000/api/specializations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(data => {
                setSpecializations([...specializations, data]);
                console.log('Specialization added:', data);
            })
            .catch(error => console.error('Error adding specialization:', error));
    };

    const handleDeleteSpecialization = (specializationId) => {
        fetch(`http://localhost:5000/api/specializations/${specializationId}`, { method: 'DELETE' })
            .then(() => {
                setSpecializations(specializations.filter(specialization => specialization.id !== specializationId));
            })
            .catch(error => console.error('Error deleting specialization:', error));
    };

    return (
        <div id="specializations">
            <h2>Specializations</h2>
            <Formik
                initialValues={{ name: '' }}
                validationSchema={validationSchema}
                onSubmit={handleAddSpecialization}
            >
                <Form className="form-container">
                    <div className="form-group">
                        <label htmlFor="name">Specialization Name</label>
                        <Field type="text" name="name" className="form-input" />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>

                    <button type="submit" className="btn btn-primary">Add Specialization</button>
                </Form>
            </Formik>

            <div className="specializations-list">
                {specializations.map(specialization => (
                    <div key={specialization.id} className="specialization-item">
                        <h4>{specialization.name}</h4>
                        <button onClick={() => handleDeleteSpecialization(specialization.id)} className="btn btn-danger">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Specializations;
*/

// Specialization.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';

const Specialization = () => {
  const [specializations, setSpecializations] = useState([]);
  const [newSpecialization, setNewSpecialization] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/specializations');
        const data = await response.json();
        setSpecializations(data);
      } catch (error) {
        console.error('Error fetching specializations:', error);
      }
    };
    fetchSpecializations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/specializations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Error deleting specialization:', response);
        return;
      }

      setSpecializations((prevSpecializations) =>
        prevSpecializations.filter((specialization) => specialization.id !== id)
      );
    } catch (error) {
      console.error('Error deleting specialization:', error);
    }
  };

  const handleAddSpecialization = async () => {
    if (!newSpecialization) {
      setError('Specialization name is required!');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/specializations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newSpecialization }),
      });

      if (response.ok) {
        const addedSpecialization = await response.json();
        setSpecializations((prevSpecializations) => [
          ...prevSpecializations,
          addedSpecialization,
        ]);
        setNewSpecialization('');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add specialization');
      }
    } catch (error) {
      console.error('Error adding specialization:', error);
      setError('Error adding specialization');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">The Specializations We Offer</h2>
      
      {/* Error Handling */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Add Specialization Form */}
      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Enter new specialization"
            value={newSpecialization}
            onChange={(e) => setNewSpecialization(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button variant="dark" onClick={handleAddSpecialization}>
            Add Specialization
          </Button>
        </Col>
      </Row>

      {/* Display Specializations */}
      <div>
        {specializations.length === 0 ? (
          <p>No specializations available.</p>
        ) : (
          specializations.map((specialization) => (
            <Card key={specialization.id} className="mb-3 shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <h5>{specialization.name}</h5>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(specialization.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Specialization;
