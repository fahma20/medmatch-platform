import React, { useState, useEffect } from 'react';

const Specializations = () => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch specializations when the component mounts
  useEffect(() => {
    fetch('/api/specializations')
      .then(response => response.json())
      .then(data => {
        setSpecializations(data);
        setLoading(false);
      })
      .catch(error => {
        setError("Error fetching specializations");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="row">
      {specializations.length === 0 ? (
        <p>No specializations available.</p>
      ) : (
        specializations.map(specialization => (
          <div key={specialization.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{specialization.name}</h5>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Specializations;
