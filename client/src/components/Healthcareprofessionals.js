// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HealthcareProfessionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch healthcare professionals from the backend
    axios.get('http://localhost:5000/api/healthcare_professionals')
      .then(response => {
        setProfessionals(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching healthcare professionals:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Healthcare Professionals</h2>
      {professionals.length === 0 ? (
        <p>No healthcare professionals available</p>
      ) : (
        <div className="card-deck">
          {professionals.map((professional) => (
            <div key={professional.id} className="card">
              <img className="card-img-top" src="placeholder.jpg" alt={professional.name} />
              <div className="card-body">
                <h5 className="card-title">{professional.name}</h5>
                <p className="card-text">Specialization: {professional.specializations.map(specialization => specialization.name).join(', ')}</p>
                <p className="card-text">Status: {professional.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthcareProfessionals;
