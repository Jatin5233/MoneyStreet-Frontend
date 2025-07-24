import React, { useState } from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';

const GmailContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openGmail = (e) => {
    e.preventDefault();
    
    // Construct the Gmail URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=jatinvanwani5233@gmail.com&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <i className="bi bi-envelope" style={{ fontSize: '3rem', color: '#45974e' }}></i>
        <h3 className="my-3">Email MoneyStreet Support</h3>
        <p>Fill out the form below to open Gmail with your message</p>
      </div>

      <Form onSubmit={openGmail}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject *</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Your Message *</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button 
            type="submit"
            style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
          >
            <i className="bi bi-google me-2"></i> Open in Gmail
          </Button>
        </div>
      </Form>

      <div className="mt-4 text-center text-muted">
        <p>Alternatively, you can email us directly at:</p>
        <h5>
          <a href="mailto:jatinvanwani5233@gmail.com" style={{ color: '#45974e' }}>
            jatinvanwani5233@gmail.com
          </a>
        </h5>
      </div>
    </Container>
  );
};

export default GmailContactForm;