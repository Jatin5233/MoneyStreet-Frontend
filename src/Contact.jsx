import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import EmailSupportSection from './EmailForm';
import WhatsAppChatSection from './ChatSection';

const Contact = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactMethods = [
    {
      id: 1,
      title: "Email Support",
      description: "Get detailed responses within 24 hours",
      icon: "fa-solid fa-inbox",
      action: "Email Us",
      color: "#45974e"
    },
    {
      id: 2,
      title: "Live Chat",
      description: "Instant connection with our support team",
      icon: "fa-solid fa-comment",
      action: "Start Chat",
      color: "#1976d2"
    },
    {
      id: 3,
      title: "Phone Call",
      description: "Speak directly with a financial expert",
      icon: "fa-solid fa-phone",
      action: "Call Now",
      color: "#ff9800"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true });
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus({ success: true, message: 'Your message has been sent successfully!' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-5 fw-bold mb-3" style={{ color: '#45974e' }}>Contact MoneyStreet</h1>
          <p className="lead">We're here to help with your financial journey</p>
        </Col>
      </Row>

      {!selectedMethod ? (
        <>
          <Row className="g-4 mb-5">
            {contactMethods.map((method) => (
              <Col key={method.id} lg={4} md={6}>
                <Card 
                  className="h-100 border-0 shadow-sm text-center hover-scale transition-all cursor-pointer"
                  onClick={() => setSelectedMethod(method)}
                >
                  <Card.Body className="p-4 d-flex flex-column">
                    <div 
                      className="icon-wrapper mx-auto mb-4"
                      style={{ 
                        backgroundColor: `${method.color}20`,
                        color: method.color,
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i className={`bi ${method.icon}`} style={{ fontSize: '2rem' }}></i>
                    </div>
                    <h3 className="h4 mb-3">{method.title}</h3>
                    <Card.Text className="mb-4 flex-grow-1">
                      {method.description}
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="mt-auto button2"
                      style={{ color: "white", borderColor: method.color ,backgroundColor:method.color}}
                    >
                      {method.action}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            <Col className="text-center">
              <p className="text-muted">Or fill out the form below for general inquiries</p>
              <Button 
                variant="light"
                onClick={() => setSelectedMethod({ id: 0, title: 'Contact Form' })}
              >
                Show Contact Form
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 style={{ color: '#45974e' }}>{selectedMethod.title}</h2>
                  <Button 
                    variant="light" 
                    onClick={() => setSelectedMethod(null)}
                  >
                    ← Back to options
                  </Button>
                </div>

                {selectedMethod.id === 1 ? (
                  // <div className="text-center py-4">
                  //   <i className="bi bi-envelope" style={{ fontSize: '3rem', color: '#45974e' }}></i>
                  //   <h4 className="my-3">Email MoneyStreet Support</h4>
                  //   <p className="lead">
                  //     Send your queries to <a href="mailto:support@moneystreet.com">support@moneystreet.com</a>
                  //   </p>
                  //   <p>Our team typically responds within 24 hours</p>
                  // </div>
                  <EmailSupportSection/>
                ) : selectedMethod.id === 2 ? (
                  // <div className="text-center py-4">
                  //   <i className="bi bi-chat-dots" style={{ fontSize: '3rem', color: '#1976d2' }}></i>
                  //   <h4 className="my-3">Live Chat Support</h4>
                  //   <p className="lead">Available Monday-Friday, 9AM-6PM</p>
                  //   <Button 
                  //     variant="primary"
                  //     style={{ backgroundColor: '#1976d2', borderColor: '#1976d2' }}
                  //   >
                  //     Start Live Chat
                  //   </Button>
                  //   <p className="mt-3 small text-muted">Click above to initiate a chat session</p>
                  // </div>
                  <WhatsAppChatSection/>
                ) : selectedMethod.id === 3 ? (
                  <div className="text-center py-4">
                    <i className="bi bi-telephone" style={{ fontSize: '3rem', color: '#ff9800' }}></i>
                    <h4 className="my-3">Call MoneyStreet Experts</h4>
                    <p className="lead">
                      <a href="tel:+18005551234">+1 (800) 555-1234</a>
                    </p>
                    <p>Monday-Saturday, 8AM-8PM</p>
                    <div className="mt-4">
                      <h5>International Numbers</h5>
                      <p className="mb-1">UK: +44 20 1234 5678</p>
                      <p>UAE: +971 4 123 4567</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {submitStatus?.success && (
                      <Alert variant="success" className="mb-4">
                        {submitStatus.message}
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Your Message *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button 
                          type="submit"
                          disabled={submitStatus?.loading}
                          style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
                        >
                          {submitStatus?.loading ? 'Sending...' : 'Send Message'}
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Additional Contact Info */}
      {!selectedMethod && (
        <Row className="mt-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <Card className="border-0 h-100" style={{ backgroundColor: '#f8f9fa' }}>
              <Card.Body className="p-4">
                <h4 className="mb-3" style={{ color: '#45974e' }}>Headquarters</h4>
                <address>
                  <p className="mb-1"><strong>MoneyStreet Financial Services</strong></p>
                  <p className="mb-1">123 Finance Tower</p>
                  <p className="mb-1">Mumbai, Maharashtra 400001</p>
                  <p className="mb-1">India</p>
                </address>
                <div className="mt-4">
                  <h5>Business Hours</h5>
                  <p className="mb-1">Monday-Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="border-0 h-100" style={{ backgroundColor: '#f8f9fa' }}>
              <Card.Body className="p-4">
                <h4 className="mb-3" style={{ color: '#45974e' }}>Quick Links</h4>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/faq" className="text-decoration-none">Frequently Asked Questions</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support" className="text-decoration-none">Support Center</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/feedback" className="text-decoration-none">Give Feedback</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/careers" className="text-decoration-none">Careers</Link>
                  </li>
                </ul>
                <div className="mt-4">
                  <h5>Follow Us</h5>
                  <div className="d-flex gap-3 mt-2">
                    <Button variant="light" size="sm">
                      <i className="bi bi-facebook"></i>
                    </Button>
                    <Button variant="light" size="sm">
                      <i className="bi bi-twitter"></i>
                    </Button>
                    <Button variant="light" size="sm">
                      <i className="bi bi-linkedin"></i>
                    </Button>
                    <Button variant="light" size="sm">
                      <i className="bi bi-instagram"></i>
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Contact;