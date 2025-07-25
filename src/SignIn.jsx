

import React, { useState,useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
axios.defaults.withCredentials = true;

const SignInPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
const [otpSent, setOtpSent] = useState(false);
const [otp, setOtp] = useState('');
const [isOtpVerified, setIsOtpVerified] = useState(false);

  const navigate = useNavigate();

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'fullName':
        newErrors.fullName = value.trim().length < 3 ? 'Minimum 3 characters' : '';
        break;
      case 'email':
        newErrors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
        break;
      case 'phoneNumber':
        newErrors.phoneNumber = !/^[0-9]{10}$/.test(value) ? '10 digit number required' : '';
        break;
      case 'password':
        newErrors.password = !/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(value) 
          ? '8+ chars with uppercase and number' 
          : '';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };
  
const sendOtp = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/sendOtp`, {
      phoneNo: formData.phoneNumber,
    });
    if (response.data.success) {
      setOtpSent(true);
      setSuccessMessage('OTP sent successfully');
    }
  } catch (err) {
    setApiError('Failed to send OTP');
  }
};
const verifyOtp = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/verifyOtp`, {
      phoneNo: formData.phoneNumber,
      otp,
    });
    if (response.data.success) {
      setIsOtpVerified(true);
      setSuccessMessage('OTP verified');
    } else {
      setApiError('Invalid OTP');
    }
  } catch (err) {
    setApiError('OTP verification failed');
  }
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

     if (!isOtpVerified) {
    alert("Please verify your OTP before proceeding.");
    return;
  }

    // Validate all fields before submission
    Object.keys(formData).forEach(field => {
      validateField(field, formData[field]);
    });

    if (Object.values(errors).some(err => err)) return;
    


    try {
      setLoading(true);
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signUp`, {
        username: formData.fullName,
        email: formData.email,
        phoneNo: `${formData.phoneNumber}`,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      },{withCredentials: true});
      console.log(response.data.success)
      if (response.data.user) {
        setSuccessMessage(response.data.message ||'Account created successfully!');
        setTimeout(() => {
          navigate('/'); // Redirect to home page after 2 seconds
        }, 2000);
      } else {
        setApiError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
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
                <h2 style={{ color: '#45974e' }}>Create Your Account</h2>
                <p className="text-muted">Join MoneyStreet for smarter financial management</p>
              </div>

              {apiError && <Alert variant="danger">{apiError}</Alert>}
              {successMessage && (
              <Alert variant="success" className="text-white border-0" style={{ backgroundColor: '#45974e' }}>
  {successMessage}
</Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    isInvalid={!!errors.fullName}
                    placeholder="Enter your full name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

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

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">+91</span>
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.phoneNumber}
                      placeholder="9876543210"
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                 <Button onClick={sendOtp} disabled={otpSent}>
  {otpSent ? 'OTP Sent' : 'Send OTP'}
</Button>
{otpSent && (
  <>
    <Form.Group className="mb-3">
      <Form.Label>Enter OTP</Form.Label>
      <Form.Control
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
    </Form.Group>
    <Button variant="success" onClick={verifyOtp} disabled={isOtpVerified}>
      Verify OTP
    </Button>
  </>
)}

                    
               </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Create a password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Must contain 8+ characters with at least 1 uppercase letter and 1 number
                  </Form.Text>
                </Form.Group>

                <div className="d-grid mb-3">
                  <Button 
                    type="submit" 
                    disabled={loading || Object.values(errors).some(err => err)}
                    style={{ 
                      backgroundColor: '#45974e', 
                      borderColor: '#45974e',
                      height: '48px'
                    }}
                  >
                    {loading ? (
                      <Spinner as="span" animation="border" size="sm" />
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>

                <div className="text-center pt-3 border-top">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      style={{ 
                        color: '#45974e', 
                        fontWeight: '500',
                        textDecoration: 'none'
                      }}
                    >
                      Sign In
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

export default SignInPage;