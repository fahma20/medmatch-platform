/*import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Specializations = () => {
    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/specializations')
            .then(response => response.json())
            .then(data => setSpecializations(data))
            .catch(error => console.error('Error fetching specializations:', error));
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('Specialization name is required'),
    });

    const handleAddSpecialization = (values) => {
        fetch('http://localhost:5000/api/specializations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(data => {
                setSpecializations([...specializations, data]);
                console.log('Specialization added:', data);
            })
            .catch(error => console.error('Error adding specialization:', error));
    };

    const handleDeleteSpecialization = (specializationId) => {
        fetch(`http://localhost:5000/api/specializations/${specializationId}`, { method: 'DELETE' })
            .then(() => {
                setSpecializations(specializations.filter(specialization => specialization.id !== specializationId));
            })
            .catch(error => console.error('Error deleting specialization:', error));
    };

    return (
        <div id="specializations">
            <h2>Specializations</h2>
            <Formik
                initialValues={{ name: '' }}
                validationSchema={validationSchema}
                onSubmit={handleAddSpecialization}
            >
                <Form className="form-container">
                    <div className="form-group">
                        <label htmlFor="name">Specialization Name</label>
                        <Field type="text" name="name" className="form-input" />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>

                    <button type="submit" className="btn btn-primary">Add Specialization</button>
                </Form>
            </Formik>

            <div className="specializations-list">
                {specializations.map(specialization => (
                    <div key={specialization.id} className="specialization-item">
                        <h4>{specialization.name}</h4>
                        <button onClick={() => handleDeleteSpecialization(specialization.id)} className="btn btn-danger">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Specializations;
*/

// Specialization.js
import React, { useState, useEffect } from 'react';

const Specialization = () => {
  const [specializations, setSpecializations] = useState([]);
  const [newSpecialization, setNewSpecialization] = useState('');

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/specializations');
        const data = await response.json();
        setSpecializations(data);
      } catch (error) {
        console.error('Error fetching specializations:', error);
      }
    };
    fetchSpecializations();
  }, []);

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/specializations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Error deleting specialization:', response);
        return;
      }

      setSpecializations((prevSpecializations) =>
        prevSpecializations.filter((specialization) => specialization.id !== id)
      );
    } catch (error) {
      console.error('Error deleting specialization:', error);
    }
  };

  // Handle add specialization functionality
  const handleAddSpecialization = async () => {
    if (!newSpecialization) {
      alert('Specialization name cannot be empty');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/specializations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSpecialization }),
      });

      if (!response.ok) {
        console.error('Failed to add specialization');
        return;
      }

      const addedSpecialization = await response.json();
      setSpecializations([...specializations, addedSpecialization]);
      setNewSpecialization('');
    } catch (error) {
      console.error('Error adding specialization:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Specializations</h2>

      {/* Add New Specialization */}
      <div className="mb-4">
        <h3>The Specializations We Offer</h3>
        <input
          type="text"
          className="form-control mb-2"
          value={newSpecialization}
          onChange={(e) => setNewSpecialization(e.target.value)}
          placeholder="Enter new specialization name"
        />
        <button className="btn btn-dark" onClick={handleAddSpecialization}>
          Add Specialization
        </button>
      </div>

      {/* Specializations List */}
      <div className="mt-4">
        {specializations.length === 0 ? (
          <p>No specializations available.</p>
        ) : (
          specializations.map((specialization) => (
            <div key={specialization.id} className="card mb-3 shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5 className="card-title">{specialization.name}</h5>
                <button
                  className="btn btn-dark"
                  onClick={() => handleDelete(specialization.id)}
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

export default Specialization;
