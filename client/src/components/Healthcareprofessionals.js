import React, { useState, useEffect } from 'react';

const HealthcareProfessionals = () => {
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    fetch('/api/healthcare_professionals')
      .then(response => response.json())
      .then(data => setProfessionals(data))
      .catch(error => console.error('Error fetching healthcare professionals:', error));
  }, []);

  return (
    <div>
      <h2>Healthcare Professionals</h2>
      <div className="row">
        {professionals.map(professional => (
          <div key={professional.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{professional.name}</h5>
                <p className="card-text">{professional.specialization || 'No specialization listed'}</p>
                <a href="#" className="btn btn-primary">Book Appointment</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthcareProfessionals;
