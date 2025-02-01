

import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  // Validation schema for creating/editing appointment
  const validationSchema = Yup.object({
    clientId: Yup.number().required('Client ID is required'),
    doctorId: Yup.number().required('Doctor ID is required'),
    appointmentDate: Yup.date().required('Appointment date is required'),
  });

  // Handle form submission (create new appointment)
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.error('Error adding appointment:', response);
        return;
      }

      const newAppointment = await response.json();
      setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
      resetForm();
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  // Handle deleting an appointment
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/appointments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Error deleting appointment:', response);
        return;
      }

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div>
      <h2>Appointments</h2>

      <Formik
        initialValues={{
          clientId: '',
          doctorId: '',
          appointmentDate: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="clientId">Client ID</label>
            <Field
              type="number"
              id="clientId"
              name="clientId"
              className="form-control"
            />
            <ErrorMessage name="clientId" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="doctorId">Doctor ID</label>
            <Field
              type="number"
              id="doctorId"
              name="doctorId"
              className="form-control"
            />
            <ErrorMessage name="doctorId" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date</label>
            <Field
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              className="form-control"
            />
            <ErrorMessage name="appointmentDate" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">Add Appointment</button>
        </Form>
      </Formik>

      <div className="mt-4">
        <h3>Appointments List</h3>
        {appointments.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Appointment ID: {appointment.id}</h5>
                <p className="card-text">
                  <strong>Client ID:</strong> {appointment.clientId}
                </p>
                <p className="card-text">
                  <strong>Doctor ID:</strong> {appointment.doctorId}
                </p>
                <p className="card-text">
                  <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(appointment.id)}
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

export default Appointments;

