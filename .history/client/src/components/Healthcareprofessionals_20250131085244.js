// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
import React, { useState, useEffect } from 'react';

const HealthcareProfessionals = () => {
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    // Fetch healthcare professionals with their specializations
    const fetchProfessionals = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/healthcare_professionals');
        const data = await response.json();
        setProfessionals(data);
      } catch (error) {
        console.error('Error fetching healthcare professionals:', error);
      }
    };
    fetchProfessionals();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Healthcare Professionals</h2>
      <div className="row">
        {professionals.map((professional) => (
          <div key={professional.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{professional.name}</h5>
                <h6>Specializations</h6>
                {professional.specializations.length > 0 ? (
                  <ul>
                    {professional.specializations.map((specialization, index) => (
                      <li key={index}>{specialization}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No specializations available</p>
                )}

                {/* Buttons with Black and White styles */}
                <button className="btn btn-dark text-white">View Details</button>
                <button className="btn btn-outline-dark text-dark ml-2">Contact</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthcareProfessionals;
