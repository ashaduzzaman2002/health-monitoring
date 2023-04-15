import React, { useEffect, useState } from 'react';
import '../css/navbar.css'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  const changeNav = () => {
    window.scrollY >= 80? setNavbar(true): setNavbar(false)
  }

  window.addEventListener('scroll', changeNav)

  const changebg = () => {
    const path = window.location.pathname
    path !== '/' ? setNavbar(false) : setNavbar(true)
  }
  useEffect(() => {
    const path = window.location.pathname
    path !== '/' ? setNavbar(true) : setNavbar(false)
    console.log('okk');
  }, [])
  

  return (
    <nav style={{position: 'fixed', top: 0, zIndex: 100}} className={`navbar navbar-custom navbar-expand-lg navbar-light w-100 ${navbar && 'scroll-nav'}`}>
      <div className="container">
        <Link className={`navbar-brand ${navbar && 'scroll-brad'}`} to="/">
          Medi Do
        </Link>
        <button
          className="navbar-toggler menu-btn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="nav-item">
              <NavLink onClick={changebg} className={`nav-link ${navbar && 'scroll-link'} active-link`} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={changebg} className={`nav-link ${navbar && 'scroll-link'}`} to="/doctors">
                Doctors
              </NavLink>
            </li>

            <li className="nav-item">
              <a className={`nav-link ${navbar && 'scroll-link'}`} href="#">
                Services
              </a>
            </li>

            <li className="nav-item">
              <a className={`nav-link ${navbar && 'scroll-link'}`} href="#">
                About
              </a>
            </li>

            <li className="nav-item">
              <a className={`nav-link ${navbar && 'scroll-link'}`} href="#">
                Contact
              </a>
            </li>

            <li className="nav-item dropdown">
              <span
                className={`nav-link dropdown-toggle ${navbar && 'scroll-link'}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User
              </span>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="#">
                    Apointment
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Login
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="#">
                    Register
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
