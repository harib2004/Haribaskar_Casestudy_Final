import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '', 
    gender: 'MALE', 
    role: 'ROLE_USER' 
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
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError('');

    try {
      const response = await api.post('/users/register', formData);
      
      if (response.status === 200 || response.status === 201) {
        toast.success('Registration Successful! Redirecting...', {
            position: "top-right",
            autoClose: 1000,
        });

        setTimeout(() => {
            navigate('/login');
        }, 1000);
      }
    } catch (err) {
      const errorMessage = err.response?.data || "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage); 
    }
  };

  return (
    <div className="register-page-wrapper">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="registration-card border-0 shadow-lg position-relative">
          <Card.Body className="p-5">
            <h2 className="registration-title mb-4">Registration</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} className="minimalist-form">
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

                {formData.password.length > 0 && formData.password.length < 8 && (
                  <div className="text-danger small mt-1">
                    Password must be at least 8 characters.
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small">* Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  className="underlined-input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small">* Gender</Form.Label>
                <Form.Select
                  name="gender"
                  className="underlined-input"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHERS">OTHERS</option>
                </Form.Select>
              </Form.Group>

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

export default Register;