/*import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
*/
document.addEventListener('DOMContentLoaded', () => {
    // Fetch Healthcare Professionals
    fetch('/api/healthcare_professionals')
        .then(response => response.json())
        .then(data => {
            const professionalsList = document.getElementById('healthcare-professionals-list');
            if (data.length === 0) {
                professionalsList.innerHTML = '<p>No healthcare professionals available.</p>';
            } else {
                data.forEach(professional => {
                    const div = document.createElement('div');
                    div.classList.add('col-md-4');
                    div.classList.add('mb-4');
                    div.innerHTML = `
                        <div class="card">
                            <img src="${professional.image || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${professional.name}">
                            <div class="card-body">
                                <h5 class="card-title">${professional.name}</h5>
                                <p class="card-text">${professional.specialization || 'No specialization listed'}</p>
                                <a href="#" class="btn btn-primary">Book Appointment</a>
                            </div>
                        </div>
                    `;
                    professionalsList.appendChild(div);
                });
            }
        })
        .catch(error => console.error('Error fetching healthcare professionals:', error));

    // Fetch Specializations
    fetch('/api/specializations')
        .then(response => response.json())
        .then(data => {
            const specializationsList = document.getElementById('specializations-list');
            if (data.length === 0) {
                specializationsList.innerHTML = '<p>No specializations available.</p>';
            } else {
                data.forEach(specialization => {
                    const div = document.createElement('div');
                    div.classList.add('col-md-4');
                    div.classList.add('mb-4');
                    div.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${specialization.name}</h5>
                            </div>
                        </div>
                    `;
                    specializationsList.appendChild(div);
                });
            }
        })
        .catch(error => console.error('Error fetching specializations:', error));

    // Fetch Appointments
    fetch('/api/appointments')
        .then(response => response.json())
        .then(data => {
            const appointmentsList = document.getElementById('appointments-list');
            if (data.length === 0) {
                appointmentsList.innerHTML = '<p>No appointments available.</p>';
            } else {
                data.forEach(appointment => {
                    const div = document.createElement('div');
                    div.classList.add('col-md-4');
                    div.classList.add('mb-4');
                    div.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${appointment.date} at ${appointment.time}</h5>
                                <p class="card-text">Healthcare Professional: ${appointment.healthcare_professional_id}</p>
                                <p class="card-text">Client: ${appointment.client_id}</p>
                            </div>
                        </div>
                    `;
                    appointmentsList.appendChild(div);
                });
            }
        })
        .catch(error => console.error('Error fetching appointments:', error));
});

