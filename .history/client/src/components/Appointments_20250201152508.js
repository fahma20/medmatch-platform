
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

const Appointments = () => {
  const [clients, setClients] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [clientId, setClientId] = useState('');
  const [professionalId, setProfessionalId] = useState('');
  const [message, setMessage] = useState('');

  // Fetch clients and healthcare professionals
  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/clients');
      const data = await response.json();
      setClients(data);
    };

    const fetchProfessionals = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/healthcare_professionals');
      const data = await response.json();
      setProfessionals(data);
    };

    const fetchAppointments = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/appointments');
      const data = await response.json();
      setAppointments(data);
    };

    fetchClients();
    fetchProfessionals();
    fetchAppointments();
  }, []);

  // Handle form submission for creating appointment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAppointment = {
      client_id: clientId,
      healthcare_professional_id: professionalId,
      date: appointmentDate, // Ensure the date includes both date and time
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
        // Add the newly created appointment to the appointments list dynamically
        setAppointments((prevAppointments) => [...prevAppointments, result]);

        // Display success message
        setMessage('Appointment scheduled successfully!');
        resetForm();
      } else {
        setMessage('There was an issue scheduling the appointment.');
      }
    } catch (error) {
      setMessage('Error connecting to the server.');
    }
  };

  const resetForm = () => {
    setClientId('');
    setProfessionalId('');
    setAppointmentDate('');
  };

  // Function to format the date and time for display
  const formatDateTime = (dateTime) => {
    const [date, time] = dateTime.split("T");
    return {
      date: date,
      time: time,
    };
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Schedule an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Client</label>
          <select
            className="form-control"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mt-3">
          <label>Select Healthcare Professional</label>
          <select
            className="form-control"
            value={professionalId}
            onChange={(e) => setProfessionalId(e.target.value)}
            required
          >
            <option value="">Select Healthcare Professional</option>
            {professionals.map((professional) => (
              <option key={professional.id} value={professional.id}>
                {professional.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mt-3">
          <label>Appointment Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark btn-lg mt-4">
          Schedule Appointment
        </button>
      </form>

      {message && <div className="mt-4 alert alert-info">{message}</div>}

      <div className="mt-4">
        <h3 className="text-center">Existing Appointments</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Healthcare Professional ID</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const { date, time } = formatDateTime(appointment.date); // format date and time
              return (
                <tr key={appointment.id}>
                  <td>{appointment.client_id}</td>
                  <td>{appointment.healthcare_professional_id}</td>
                  <td>{date}</td>
                  <td>{time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
