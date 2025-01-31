// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HealthcareProfessionals = () => {
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    axios.get('/api/healthcare_professionals')
      .then(response => {
        setProfessionals(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching healthcare professionals:", error);
      });
  }, []);

  return (
    <div>
      <h2>Healthcare Professionals</h2>
      <Link to="/healthcare-professionals/create" className="btn btn-primary mb-3">Add New Professional</Link>
      <div className="list-group">
        {professionals.map(professional => (
          <div key={professional.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{professional.name}</span>
            <div>
              <Link to={`/healthcare-professionals/${professional.id}`} className="btn btn-info btn-sm me-2">View</Link>
              <Link to={`/healthcare-professionals/${professional.id}/edit`} className="btn btn-warning btn-sm">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthcareProfessionals;
