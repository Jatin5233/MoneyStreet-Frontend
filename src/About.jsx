import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Container className="py-5">
      {/* Section Header */}
      <Row className="mb-5">
        <Col className="text-center">
          <Badge pill bg="success" className="mb-3">YOUR FINANCIAL COMPANION</Badge>
          <h1 className="display-5 fw-bold mb-3" style={{ color: '#45974e' }}>Welcome to MoneyStreet</h1>
          <p className="lead text-muted">Your trusted guide to smarter financial decisions</p>
        </Col>
      </Row>

      {/* Main Content with Image Space */}
      <Row className="align-items-center g-5">
        
        <Col lg={6}>
          <div className="about-image p-4 text-center" 
            style={{
              backgroundColor: '#f0f8f1',
              borderRadius: '16px',
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <div>
              <i className="bi bi-piggy-bank text-muted" style={{ fontSize: '3rem', color: '#45974e' }}></i>
              <img 
  src="/fin1.png" 
  alt="MoneyStreet Team" 
  className="img-fluid rounded shadow"
  style={{ maxHeight: '600px', objectFit: 'cover' }}
/>
              <h4 className="mt-3" style={{ color: '#45974e' }}>Simplifying Your Financial Journey</h4>
            </div>
          </div>
        </Col>

        {/* Content Column */}
        <Col lg={6}>
          <div className="ps-lg-4">
            <h2 className="mb-4">Your Trusted Financial Advisor</h2>
            
            <div className="mb-4">
              <p>
                We specialize in personalized guidance for loans and credit cards, helping you cut through 
                the clutter and find the right financial products that suit your needs. Whether you're building 
                credit, planning a big purchase, or simply looking for the best interest rates, we make the 
                process simple, transparent, and stress-free.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="mb-3" style={{ color: '#45974e' }}>Our Philosophy</h5>
              <p>
                At MoneyStreet, we believe financial freedom starts with the right advice. Our expert-backed 
                insights, tools, and recommendations empower you to make confident choices — without the 
                fine print headaches.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="mb-3" style={{ color: '#45974e' }}>🚀 What We Offer</h5>
              <ul className="list-unstyled">
                <li className="mb-2 d-flex">
                  <i className="bi bi-credit-card-fill text-success me-2"></i>
                  <strong>Expert comparisons </strong>  &nbsp;on top credit cards
                </li>
                <li className="mb-2 d-flex">
                  <i className="bi bi-cash-stack text-success me-2"></i>
                  <strong>Tailored loan suggestions </strong> &nbsp;for every situation
                </li>
                <li className="mb-2 d-flex">
                  <i className="bi bi-search-heart-fill text-success me-2"></i>
                  <strong>Honest reviews </strong> &nbsp;and up-to-date financial tips
                </li>
                <li className="mb-2 d-flex">
                  <i className="bi bi-graph-up-arrow text-success me-2"></i>
                  <strong>Easy-to-use tools </strong> &nbsp;for better decision making
                </li>
              </ul>
            </div>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Button 
                as={Link} 
                to="/services" 
                variant="outline-primary" 
                style={{ color: '#45974e', borderColor: '#45974e' }}
              >
                Explore Services
              </Button>
              <Button 
                as={Link} 
                to="/contact" 
                style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
              >
                Get Personalized Advice
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Community Section */}
      <Row className="mt-5 pt-5">
        <Col className="text-center bg-light py-4 rounded-3">
          <h3 className="mb-3">Join Our Financial Community</h3>
          <p className="lead mb-4">
            Thousands trust MoneyStreet to guide them toward better financial health — one step at a time.
          </p>
          <Button 
            variant="success" 
            size="lg"
            style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
          >
            Start Your Journey Today
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default About;