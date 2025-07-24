import React from 'react';
import { Container, Button, Alert } from 'react-bootstrap';

const WhatsAppChatSection = () => {
  // Replace with your actual WhatsApp number (include country code, remove any spaces or special characters)
  const whatsappNumber = '+919355007774'; // Example: 91 for India, followed by number
  const defaultMessage = 'Hello MoneyStreet, I have a question about...';

  const openWhatsApp = () => {
    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Container className="py-4 text-center">
      <i className="bi bi-whatsapp" style={{ fontSize: '3rem', color: '#25D366' }}></i>
      <h3 className="my-3">WhatsApp Support</h3>
      <p className="lead">Chat directly with our support team via WhatsApp</p>
      
      <div className="my-4">
        <p>Available Monday-Friday, 9AM-6PM</p>
        <Button 
          variant="success"
          size="lg"
          onClick={openWhatsApp}
          style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
        >
          <i className="bi bi-whatsapp me-2"></i> Start WhatsApp Chat
        </Button>
      </div>

      <Alert variant="light" className="mt-4">
        <h5>Important Information</h5>
        <ul className="list-unstyled">
          <li>• We typically respond within 15 minutes during business hours</li>
          <li>• Please save our number in your contacts: +{whatsappNumber}</li>
          <li>• For detailed queries, include your customer ID if available</li>
        </ul>
      </Alert>

      <div className="mt-4 text-muted">
        <p>Don't have WhatsApp?</p>
        <Button 
          variant="outline-secondary" 
          onClick={() => window.location.href = 'tel:+' + whatsappNumber}
        >
          <i className="bi bi-telephone me-2"></i> Call Us Instead
        </Button>
      </div>
    </Container>
  );
};

export default WhatsAppChatSection;