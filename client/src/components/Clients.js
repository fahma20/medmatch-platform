import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Clients = () => {
  const [clients, setClients] = useState([]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    fetch('http://localhost:5000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error creating client');
        }
        return response.json();
      })
      .then((data) => {
        setClients((prevClients) => [...prevClients, data]); // Update client list
        resetForm(); // Reset form after successful submission
      })
      .catch((error) => {
        console.error('Error creating client:', error);
        alert('Error creating client, please try again.'); // Notify user about the error
      });
  };

  return (
    <div>
      <h2>Add Client</h2>
      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      </Formik>

      <h3>Clients List</h3>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>{client.name} - {client.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
