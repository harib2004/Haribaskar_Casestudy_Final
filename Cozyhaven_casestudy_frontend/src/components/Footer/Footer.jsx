import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row>
          <Col sm={12} md={6} className="mb-4 mb-md-0">
            <h6 className="footer-title">About</h6>
            <p className="footer-text">
              <span className="brand-name">COZYHAVEN</span> is your premier destination for finding 
              the perfect stay. Whether it's a luxury villa in Udaipur or a beachfront escape in Goa, 
              we focus on providing the most seamless booking experience for travelers worldwide.
            </p>
          </Col>

          <Col xs={6} md={3}>
            <h6 className="footer-title">Categories</h6>
            <ul className="footer-links">
              <li><Link to="/">Luxury Villas</Link></li>
              <li><Link to="/">Honeymoon Suites</Link></li>
              <li><Link to="/">Beach Resorts</Link></li>
              <li><Link to="/">Mountain Lodges</Link></li>
              <li><Link to="/">Heritage Stays</Link></li>
            </ul>
          </Col>

          <Col xs={6} md={3}>
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/register-admin">Contribute</Link></li>
              <li><Link to="/login">Admin Login</Link></li>
              <li><Link to="/register-owner">Owner Registration</Link></li>
            </ul>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row className="align-items-center">
          <Col md={8} sm={6} xs={12}>
            <p className="copyright-text">
              Copyright &copy; 2026 All Rights Reserved by <Link to="/">CozyHaven</Link>.
            </p>
          </Col>

          <Col md={4} sm={6} xs={12}>
            <ul className="social-icons">
              <li><a className="facebook" href="#"><i className="bi bi-facebook"></i>F</a></li>
              <li><a className="twitter" href="#"><i className="bi bi-twitter"></i>T</a></li>
              <li><a className="dribbble" href="#"><i className="bi bi-dribbble"></i>W</a></li>
              <li><a className="linkedin" href="#"><i className="bi bi-linkedin"></i>L</a></li>   
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;