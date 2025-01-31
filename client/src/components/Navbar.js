/*import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">MedMatch</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Healthcare Professionals</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/clients">Clients</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/appointments">Appointments</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
*/

// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">MEDMATCH</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/healthcare-professionals">Healthcare Professionals</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/clients">Clients</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/appointments">Appointments</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/specializations">Specializations</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
