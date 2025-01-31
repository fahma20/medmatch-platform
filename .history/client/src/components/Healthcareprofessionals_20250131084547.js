// HealthcareProfessional.js
// HealthcareProfessional.js


import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Collapse, Card } from 'react-bootstrap';

const HealthcareProfessional = () => {
  const [professionals, setProfessionals] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState({});  // To handle collapsible state for each professional

  // Fetch healthcare professionals with their specializations
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/healthcare_professionals');
        const data = await response.json();
        setProfessionals(data);
      } catch (error) {
        console.error('Error fetching healthcare professionals:', error);
      }
    };
    fetchProfessionals();
  }, []);

  // Validation schema for form (Create and Update)
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });

  // Handle form submission (Create or Update)
  const handleSubmit = async (values, { resetForm }) => {
    if (editing) {
      // Update an existing professional
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/healthcare_professionals/${editing.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          console.error('Error updating healthcare professional:', response);
          return;
        }

        const updatedProfessional = await response.json();
        setProfessionals((prevProfessionals) =>
          prevProfessionals.map((professional) =>
            professional.id === editing.id ? updatedProfessional : professional
          )
        );
        setEditing(null);
        resetForm();
      } catch (error) {
        console.error('Error updating healthcare professional:', error);
      }
    } else {
      // Create a new professional
      try {
        const response = await fetch('http://127.0.0.1:5000/api/healthcare_professionals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          console.error('Error adding healthcare professional:', response);
          return;
        }

        const newProfessional = await response.json();
        setProfessionals((prevProfessionals) => [...prevProfessionals, newProfessional]);
        resetForm();
      } catch (error) {
        console.error('Error adding healthcare professional:', error);
      }
    }
  };

  // Handle deleting a healthcare professional
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/healthcare_professionals/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Error deleting healthcare professional:', response);
        return;
      }

      setProfessionals((prevProfessionals) => prevProfessionals.filter((professional) => professional.id !== id));
    } catch (error) {
      console.error('Error deleting healthcare professional:', error);
    }
  };

  // Handle editing a healthcare professional
  const handleEdit = (professional) => {
    setEditing(professional);
  };

  // Toggle collapsible for each professional's specializations
  const toggleSpecializations = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{editing ? 'Edit Healthcare Professional' : 'Add Healthcare Professional'}</h2>

      {/* Form for adding or editing healthcare professional */}
      <Formik
        initialValues={{
          name: editing ? editing.name : '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter Professional Name"
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">
            {editing ? 'Update Professional' : 'Add Professional'}
          </button>
          {editing && (
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => {
                setEditing(null);
              }}
            >
              Cancel
            </button>
          )}
        </Form>
      </Formik>

      {/* List of healthcare professionals */}
      <div className="mt-4">
        <h3>Healthcare Professionals List</h3>
        {professionals.length === 0 ? (
          <p>No healthcare professionals available.</p>
        ) : (
          professionals.map((professional) => (
            <Card key={professional.id} className="mb-3 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">{professional.name}</h5>
                  <div>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(professional)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(professional.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Specializations */}
                {professional.specializations && professional.specializations.length > 0 && (
                  <>
                    <Button
                      variant="link"
                      onClick={() => toggleSpecializations(professional.id)}
                      aria-expanded={open[professional.id] ? 'true' : 'false'}
                    >
                      {open[professional.id] ? 'Hide Specializations' : 'Show Specializations'}
                    </Button>
                    <Collapse in={open[professional.id]}>
                      <div className="mt-3">
                        <ul className="list-group">
                          {professional.specializations.map((specialization) => (
                            <li key={specialization.id} className="list-group-item">
                              {specialization.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Collapse>
                  </>
                )}
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default HealthcareProfessional;
