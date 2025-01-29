import React, { useState, useEffect } from "react";

const HealthcareProfessionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    fetch('/api/healthcare_professionals')
      .then(response => response.json())
      .then(data => {
        setProfessionals(data);
        setLoading(false);
      })
      .catch(error => {
        setError("Error fetching healthcare professionals");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="row">
      {professionals.length === 0 ? (
        <p>No healthcare professionals available.</p>
      ) : (
        professionals.map(professional => (
          <div key={professional.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{professional.name}</h5>
                <p className="card-text">
                  {professional.specialization || "No specialization listed"}
                </p>
                {/* Displaying specializations */}
                {professional.specializations && professional.specializations.length > 0 && (
                  <ul>
                    {professional.specializations.map((specialization, index) => (
                      <li key={index}>{specialization.name}</li>
                    ))}
                  </ul>
                )}
                <a href="#" className="btn btn-primary">
                  Book Appointment
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HealthcareProfessionals;
