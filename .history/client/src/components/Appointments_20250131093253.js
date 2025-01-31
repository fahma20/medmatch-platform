
/*
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
*/
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [clientId, setClientId] = useState('');
  const [professionalId, setProfessionalId] = useState('');
  const [message, setMessage] = useState('');

  // Fetch existing appointments, clients, and healthcare professionals
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsResponse, clientsResponse, professionalsResponse] = await Promise.all([
          fetch('http://127.0.0.1:5000/api/appointments'),
          fetch('http://127.0.0.1:5000/api/clients'),
          fetch('http://127.0.0.1:5000/api/healthcare_professionals'),
        ]);

        const [appointmentsData, clientsData, professionalsData] = await Promise.all([
          appointmentsResponse.json(),
          clientsResponse.json(),
          professionalsResponse.json(),
        ]);

        setAppointments(appointmentsData);
        setClients(clientsData);
        setProfessionals(professionalsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle appointment submission (Create appointment)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAppointment = {
      client_id: clientId,
      healthcare_professional_id: professionalId,
      date: appointmentDate,
      time: appointmentTime,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });

      if (response.ok) {
        const result = await response.json();
        // Add the new appointment to the state without refreshing
        setAppointments((prevAppointments) => [...prevAppointments, result]);
        setMessage('Appointment scheduled successfully!');
        resetForm();
      } else {
        setMessage('There was an issue scheduling the appointment.');
      }
    } catch (error) {
      setMessage('Error connecting to the server.');
    }
  };

  // Handle appointment deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/appointments/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.id !== id));
        setMessage('Appointment deleted successfully!');
      } else {
        setMessage('Error deleting appointment.');
      }
    } catch (error) {
      setMessage('Error connecting to the server.');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setAppointmentDate('');
    setAppointmentTime('');
    setClientId('');
    setProfessionalId('');
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: '#333' }}>Manage Appointments</h2>

      {/* Appointment creation form */}
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="form-group">
          <label className="font-weight-bold" style={{ color: '#333' }}>Select Client (ID)</label>
          <select
            className="form-control"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.id} - {client.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mt-3">
          <label className="font-weight-bold" style={{ color: '#333' }}>Select Healthcare Professional (ID)</label>
          <select
            className="form-control"
            value={professionalId}
            onChange={(e) => setProfessionalId(e.target.value)}
          >
            <option value="">Select Healthcare Professional</option>
            {professionals.map((professional) => (
              <option key={professional.id} value={professional.id}>
                {professional.id} - {professional.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mt-3">
          <label className="font-weight-bold" style={{ color: '#333' }}>Appointment Date</label>
          <input
            type="date"
            className="form-control"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label className="font-weight-bold" style={{ color: '#333' }}>Appointment Time</label>
          <input
            type="time"
            className="form-control"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark mt-4 w-100">
          Schedule Appointment
        </button>
      </form>

      {/* Display success message */}
      {message && <div className="mt-4 alert alert-success">{message}</div>}

      {/* List of appointments */}
      <h3 className="mt-5" style={{ color: '#333' }}>Existing Appointments</h3>
      <div className="list-group">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="list-group-item d-flex justify-content-between align-items-center mb-2">
            <div>
              <h5>Client ID: {appointment.client_id} with Healthcare Professional ID: {appointment.healthcare_professional_id}</h5>
              <p>Date: {appointment.date} at {appointment.time}</p>
            </div>
            <button
              className="btn btn-outline-dark"
              onClick={() => handleDelete(appointment.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
