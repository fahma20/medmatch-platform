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
import { Modal, Button, Form, Card, Alert } from 'react-bootstrap';

const Specialization = () => {
  const [specializations, setSpecializations] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSpecialization, setNewSpecialization] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/specializations');
        const data = await response.json();
        setSpecializations(data);
      } catch (error) {
        console.error('Error fetching specializations:', error);
        setError('Failed to load specializations.');
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

      if (!response.ok) {
        console.error('Error adding specialization:', response);
        return;
      }

      const newSpecializationData = await response.json();
      setSpecializations([...specializations, newSpecializationData]);
      setShowAddModal(false);
      setNewSpecialization('');
      setError(null);
    } catch (error) {
      console.error('Error adding specialization:', error);
      setError('Failed to add specialization.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Specializations</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Button
        variant="primary"
        className="mb-4"
        onClick={() => setShowAddModal(true)}
      >
        Add Specialization
      </Button>

      <div className="mt-4">
        <h3>Specializations List</h3>
        {specializations.length === 0 ? (
          <p>No specializations available.</p>
        ) : (
          specializations.map((specialization) => (
            <Card key={specialization.id} className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>{specialization.name}</Card.Title>
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

      {/* Modal for adding specialization */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Specialization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="specializationName">
              <Form.Label>Specialization Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter specialization name"
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSpecialization}>
            Add Specialization
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Specialization;
