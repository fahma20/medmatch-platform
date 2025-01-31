/*import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
        // If the response status is not OK, handle the error
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to add client.');
        return;
      }
  
      // If the response is OK, handle the success
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
    <div>
      <h2>Clients</h2>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <Formik
        initialValues={{
          name: '',
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="name">Client Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter Client Name"
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Client Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter Client Email"
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">Add Client</button>
        </Form>
      </Formik>

      <div className="mt-4">
        <h3>Clients List</h3>
        {clients.length === 0 ? (
          <p>No clients available.</p>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{client.name}</h5>
                <p className="card-text"><strong>Email:</strong> {client.email}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(client.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Clients;
*/

// Client.js
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);

  // Fetch clients from backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/clients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  // Validation schema for creating/editing client
  const validationSchema = Yup.object({
    name: Yup.string().required('Client name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  // Handle form submission (create or update client)
  const handleSubmit = async (values, { resetForm }) => {
    try {
      let response;
      let method = 'POST';
      let url = 'http://127.0.0.1:5000/api/clients';

      if (editingClient) {
        // Update existing client
        method = 'PUT';
        url = `http://127.0.0.1:5000/api/clients/${editingClient.id}`;
      }

      response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.error('Error saving client:', response);
        return;
      }

      const savedClient = await response.json();

      if (editingClient) {
        setClients(clients.map((client) =>
          client.id === savedClient.id ? savedClient : client
        ));
        setEditingClient(null); // Reset after updating
      } else {
        setClients((prevClients) => [...prevClients, savedClient]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  // Handle deleting a client
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/clients/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Error deleting client:', response);
        return;
      }

      setClients((prevClients) => prevClients.filter((client) => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  // Handle editing a client (pre-fill form with client details)
  const handleEdit = (client) => {
    setEditingClient(client);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{editingClient ? 'Edit Client' : 'Add New Client'}</h2>

      {/* Form for adding/updating clients */}
      <Formik
        initialValues={{
          name: editingClient ? editingClient.name : '',
          email: editingClient ? editingClient.email : '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group mb-3">
            <label htmlFor="name">Client Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter Client Name"
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Client Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter Client Email"
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">{editingClient ? 'Update Client' : 'Add Client'}</button>
        </Form>
      </Formik>

      {/* List of existing clients */}
      <div className="mt-4">
        <h3>Clients List</h3>
        {clients.length === 0 ? (
          <p>No clients available.</p>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{client.name}</h5>
                <p className="card-text"><strong>Email:</strong> {client.email}</p>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(client)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Clients;
