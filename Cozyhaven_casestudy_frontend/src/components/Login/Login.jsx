import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext/AuthContext';
import './Login.css';
import api from '../../services/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/users/login", formData);
      const userData = response.data;

      if (userData && userData.token) {
        login(userData);

        toast.success('Login Successful!', { 
          position: "top-right", 
          autoClose: 1000 
        });
        setTimeout(() => {
          const userRole = userData.role; 

          if (userRole === "ROLE_OWNER" || userRole === "OWNER") {
            navigate('/owner');
          } else if (userRole === "ROLE_ADMIN" || userRole === "ADMIN") {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        setError("Login failed. No token received.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Please check your email and password.");
    }
  };

  return (
    <div className="login-page-wrapper">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="login-card border-0 shadow-lg" style={{ width: '100%', maxWidth: '450px' }}>
          <Card.Body className="p-5">
            <h2 className="login-form-title mb-4 text-center fw-bold">Login</h2>
            {error && <Alert variant="danger" className="py-2 small text-center">{error}</Alert>}
            
            <Form onSubmit={handleSubmit} className="minimalist-form">
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  className="underlined-input-blue shadow-none"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4 position-relative">
                <Form.Label className="small fw-bold text-muted">Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="underlined-input-blue shadow-none"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span 
                  className="password-toggle-blue" 
                  style={{ cursor: 'pointer', position: 'absolute', right: '0', top: '32px' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} className="text-primary"/> : <EyeOff size={18} className="text-muted"/>}
                </span>
              </Form.Group>

              <Button 
                type="submit" 
                className="login-submit-btn w-100 border-0 mt-3 rounded-pill fw-bold py-2" 
              >
                LOGIN
              </Button>

              <div className="text-center mt-4 register-redirect small">
                Don't have an account? <Link to="/register" className="fw-bold text-primary text-decoration-none">Register</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Login;