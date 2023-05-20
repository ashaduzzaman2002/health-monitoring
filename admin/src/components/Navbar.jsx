import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const {pathname} = useLocation()
  const {logout} = useContext(AppContext)
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ paddingTop: 0, paddingBottom: 0 }}
    >
      <div className="container-fluid" style={{ padding: '0 25px' }}>
        <Link className="navbar-brand" to="/">
          MediDoc
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${pathname=== '/'? 'active':''}`} to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname ==='/all-patients'? 'active':''}`} to='/all-patients'>
                Patients
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname ==='/all-doctors'? 'active':''}`} to="/all-doctors">
                Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname ==='/all-apointments'? 'active':''}`} to='/all-apointments'>Apointments</Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${pathname ==='/add-doctor'? 'active':''}`} to="/add-doctor">
                Add Doctor
              </Link>
            </li>

            <li className="nav-item ms-3">
              <button onClick={logout} className="btn btn-primary">
                Logout
              </button>
            </li>

          </ul>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
