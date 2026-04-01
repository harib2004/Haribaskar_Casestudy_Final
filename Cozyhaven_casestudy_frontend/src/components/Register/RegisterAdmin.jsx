import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import './Register.css';

function RegisterAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    gender: 'Other',
    role: 'ROLE_ADMIN' 
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', formData);
      
      if (response.status === 200 || response.status === 201) {
        alert("Account Created Successfully!");
        navigate('/login');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="register-page-wrapper">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="registration-card border-0 shadow-lg position-relative">
          <Card.Body className="p-5">
            <h2 className="registration-title mb-4">Admin Registration</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} className="minimalist-form">
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label className="small">* Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className="underlined-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label className="small">* Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  className="underlined-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3 position-relative">
                <Form.Label className="small">* Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="underlined-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={18}/> : <EyeOff size={18}/>}
                </span>
              </Form.Group>

              {/* Phone */}
              <Form.Group className="mb-3">
                <Form.Label className="small">* Phone (10 digits)</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  className="underlined-input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Address */}
              <Form.Group className="mb-3">
                <Form.Label className="small">Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  className="underlined-input"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button 
                type="submit" 
                className="create-account-btn w-100 border-0"
              >
                CREATE ACCOUNT
              </Button>

              <div className="text-center mt-4 login-redirect">
                Already have an account? <Link to="/login" className="fw-bold">Login</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default RegisterAdmin;