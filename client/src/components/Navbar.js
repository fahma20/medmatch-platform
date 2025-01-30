import React from 'react';
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
