import React, { useState,useContext } from 'react';
import { Container, Form, Button, Alert, Spinner, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from './AuthContext';

const LoginPage = () => {
  const { isAuthenticated ,setIsAuthenticated} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    // Validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      console.log(import.meta.env.REACT_BASE_URL)
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email: formData.email,
        password: formData.password
      },{
  withCredentials: true
});

      if (response.data.success) {
        setIsAuthenticated(true)
        localStorage.setItem('authToken', response.data.token);
        
        // Show success message before redirect
        setSuccessMessage('Login successful! Redirecting...');
        
        setTimeout(() => {
          navigate('/'); // Redirect after 1.5 seconds
        }, 1500);
      } else {
        setApiError(response.data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setApiError(
        err.response?.data?.message || 
        'Network error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <img 
                  src="/logo.png" 
                  alt="MoneyStreet" 
                  width="120" 
                  className="mb-3"
                />
                <h2 style={{ color: '#45974e' }}>Welcome Back</h2>
                <p className="text-muted">Sign in to your MoneyStreet account</p>
              </div>

              {apiError && <Alert variant="danger">{apiError}</Alert>}
              
              {/* Success Alert with MoneyStreet Green */}
              {successMessage && (
                <Alert 
                  variant="success" 
                  style={{ 
                    backgroundColor: '#45974e', 
                    color: 'white',
                    borderColor: '#3a7d44'
                  }}
                >
                  {successMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="your@email.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter your password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                  <div className="text-end mt-2">
                    <Link to="/forgot-password" style={{ color: '#45974e', fontSize: '0.875rem' }}>
                      Forgot password?
                    </Link>
                  </div>
                </Form.Group>

                <div className="d-grid mb-3">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                      backgroundColor: '#45974e', 
                      borderColor: '#45974e',
                      height: '48px'
                    }}
                  >
                    {loading ? (
                      <Spinner as="span" animation="border" size="sm" />
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </div>

                <div className="text-center pt-3 border-top">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: '#45974e', fontWeight: '500' }}>
                      Sign Up
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;