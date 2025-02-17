
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [healthcareProfessionals, setHealthcareProfessionals] = useState([]);
  const [formData, setFormData] = useState({
    client_id: '',
    healthcare_professional_id: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    fetchAppointments();
    fetchClients();
    fetchHealthcareProfessionals();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients', error);
    }
  };

  const fetchHealthcareProfessionals = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/healthcare_professionals');
      const data = await response.json();
      setHealthcareProfessionals(data);
    } catch (error) {
      console.error('Error fetching healthcare professionals', error);
    }
  };

  // Converts 24-hour time to 12-hour AM/PM format
  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':');
    let hoursInt = parseInt(hours, 10);
    const ampm = hoursInt >= 12 ? 'PM' : 'AM';
    hoursInt = hoursInt % 12;
    hoursInt = hoursInt ? hoursInt : 12; // the hour '0' should be '12'
    return `${hoursInt}:${minutes} ${ampm}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the time to 12-hour format with AM/PM
    const formattedTime = convertTo12HourFormat(formData.time);

    const newAppointment = {
      ...formData,
      time: formattedTime,
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
        // Add new appointment to the list dynamically
        const appointment = await response.json();
        setAppointments((prevAppointments) => [...prevAppointments, appointment]);

        // Reset form after submitting
        setFormData({ client_id: '', healthcare_professional_id: '', date: '', time: '' });
      } else {
        console.error('Error creating appointment');
      }
    } catch (error) {
      console.error('Error creating appointment', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/appointments/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAppointments(appointments.filter((appointment) => appointment.id !== id));
      } else {
        console.error('Error deleting appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment', error);
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Schedule an Appointment</h2>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="client_id">
              <Form.Label>Client</Form.Label>
              <Form.Control
                as="select"
                name="client_id"
                value={formData.client_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="healthcare_professional_id">
              <Form.Label>Healthcare Professional</Form.Label>
              <Form.Control
                as="select"
                name="healthcare_professional_id"
                value={formData.healthcare_professional_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Healthcare Professional</option>
                {healthcareProfessionals.map((professional) => (
                  <option key={professional.id} value={professional.id}>
                    {professional.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="date">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="time">
              <Form.Label>Appointment Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="dark" type="submit">Schedule Appointment</Button>
      </Form>

      <h2 className="mt-5">Existing Appointments</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Healthcare Professional</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.client_id}</td>
              <td>{appointment.healthcare_professional_id}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>
                <Button
                  variant="dark"
                  onClick={() => handleDelete(appointment.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Appointments;
