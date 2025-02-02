import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toast } from 'react-bootstrap'; // We'll use React Bootstrap for notifications

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch clients from backend
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/api/clients');
        if (!response.ok) {
          setErrorMessage('Failed to fetch clients.');
          return;
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        setErrorMessage('Error fetching clients.');
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Validation schema for creating/editing client
  const validationSchema = Yup.object({
    name: Yup.string().required('Client name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  // Handle form submission (create new client)
  const handleSubmit = async (values, { resetForm }) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to add client.');
        return;
      }

      const newClient = await response.json();
      setClients((prevClients) => [...prevClients, newClient]); // Add the new client to the list
      setSuccessMessage('Client added successfully!');
      resetForm(); // Reset the form fields after successful submission
    } catch (error) {
      console.error('Error adding client:', error);
      setErrorMessage('Error adding client. Please try again.');
    }
  };

  // Handle deleting a client
  const handleDelete = async (id) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/clients/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to delete client.');
        return;
      }

      setClients((prevClients) => prevClients.filter((client) => client.id !== id));
      setSuccessMessage('Client deleted successfully.');
    } catch (error) {
      console.error('Error deleting client:', error);
      setErrorMessage('Error deleting client. Please try again.');
    }
  };

  return (
    <div className="container my-5">
      {/* "CLIENTS" heading to show the purpose of the page */}
      <h2 className="text-center mb-4 text-dark font-weight-bold" style={{ fontSize: '2rem' }}>
        CLIENTS
      </h2>

      {/* Success and Error Toasts */}
      {successMessage && (
        <Toast bg="success" className="mb-3" onClose={() => setSuccessMessage(null)}>
          <Toast.Body>{successMessage}</Toast.Body>
        </Toast>
      )}
      {errorMessage && (
        <Toast bg="danger" className="mb-3" onClose={() => setErrorMessage(null)}>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
      )}

      {/* Client Form */}
      <Formik
        initialValues={{
          name: '',
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group mb-3">
            <label htmlFor="name" className="text-dark">Client Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter Client Name"
              style={{ fontSize: '1rem' }} // Adjusting font size for better readability
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email" className="text-dark">Client Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter Client Email"
              style={{ fontSize: '1rem' }} // Adjusting font size for better readability
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          {/* Submit button with subdued green accent */}
          <button type="submit" className="btn" style={{ backgroundColor: '#0a9396', color: '#ffffff', width: '100%', fontSize: '1rem' }}>
            {loading ? 'Adding Client...' : 'Add Client'}
          </button>
        </Form>
      </Formik>

      {/* Clients List */}
      <div className="mt-4">
        <h3 className="text-dark" style={{ fontSize: '1.5rem' }}>Clients List</h3>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : clients.length === 0 ? (
          <p className="text-center text-dark">No clients available.</p>
        ) : (
          <div className="row">
            {clients.map((client) => (
              <div key={client.id} className="col-md-4 mb-4">
                <div className="card shadow-sm" style={{ backgroundColor: '#f7f7f7', border: 'none' }}>
                  <div className="card-body">
                    {/* Changed client name color to dark gray for a subtle look */}
                    <h5 className="card-title" style={{ color: '#333' }}>{client.name}</h5>
                    <p className="card-text" style={{ fontSize: '1rem' }}><strong>Email:</strong> {client.email}</p>
                    <button
                      className="btn"
                      style={{ backgroundColor: '#0a9396', color: '#ffffff', width: '100%', fontSize: '1rem' }}
                      onClick={() => handleDelete(client.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
