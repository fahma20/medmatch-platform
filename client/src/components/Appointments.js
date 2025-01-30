import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    client_id: Yup.number().required('Client is required'),
    healthcare_professional_id: Yup.number().required('Healthcare Professional is required'),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(data => {
        setAppointments([...appointments, data]);
      })
      .catch(error => console.error('Error creating appointment:', error));
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <Formik
        initialValues={{ date: '', time: '', client_id: '', healthcare_professional_id: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <Field type="date" id="date" name="date" className="form-control" />
            <ErrorMessage name="date" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <Field type="time" id="time" name="time" className="form-control" />
            <ErrorMessage name="time" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="client_id">Client ID</label>
            <Field type="number" id="client_id" name="client_id" className="form-control" />
            <ErrorMessage name="client_id" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="healthcare_professional_id">Healthcare Professional ID</label>
            <Field type="number" id="healthcare_professional_id" name="healthcare_professional_id" className="form-control" />
            <ErrorMessage name="healthcare_professional_id" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      </Formik>

      <h3>Appointments</h3>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>{appointment.date} - {appointment.time}</li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
