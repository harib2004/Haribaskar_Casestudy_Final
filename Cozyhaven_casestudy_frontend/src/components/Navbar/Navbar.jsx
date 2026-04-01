import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../AuthContext/AuthContext'; 
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();




  return (
    <div className="fixed-top shadow-sm">
      <BootstrapNavbar bg="white" expand="lg" className="py-3">
        <Container fluid className="px-lg-5">
          {/* Logo */}
          <NavLink to='/'>
            <img src="img/cozyhaven_logo.png" style={{ width: '70px', height: '70px', objectFit: 'cover' }}/>
          </NavLink>
           {/* Logo Text */}
          <NavLink to='/'  className="navbar-brand d-flex align-items-center fw-bold text-primary">
            CozyHaven
          </NavLink>

          <BootstrapNavbar.Toggle aria-controls="main-nav" />

          <BootstrapNavbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              {user ? (
                <div className="d-flex align-items-center flex-row">
                  
                  {user.role === 'ROLE_USER' && (
                    
                    <NavLink to="/profile" className="nav-link me-3 text-dark fw-bold p-0">
                    Profile
                  </NavLink>
                  )}

                  <NavLink onClick={logout} className="btn btn-primary px-4 rounded-pill fw-bold text-white shadow-sm">
                    Logout
                  </NavLink>
                </div>
              ) : (
                <div className="d-flex align-items-center flex-row">
                  <NavLink to="/login" className="nav-link me-3 text-dark fw-bold p-0">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="btn btn-primary px-4 rounded-pill fw-bold text-white shadow-sm">
                    Register
                  </NavLink>
                </div>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </div>
  );
}

export default Navbar;