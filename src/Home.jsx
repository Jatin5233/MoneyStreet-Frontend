import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  return (
    <>
      <section className="hero-section py-5 " style={{ backgroundColor: '#f0f8f1' ,width:"100%"}}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">Smart Financial Solutions with <span style={{ color: '#45974e' }}>MoneyStreet</span></h1>
              <p className="lead mb-4">Take control of your finances with our innovative tools and expert guidance.</p>
              <Button as={Link} to="/get-started" variant="primary" size="lg" className="me-2" style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}>Get Started</Button>
              <Button as={Link} to="/about" variant="outline-secondary" size="lg">Learn More</Button>
            </Col>
            <Col lg={6}>
              <img 
                src="/fin2.png" 
                alt="Financial illustration" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
      
          <Row>
            {/* ... rest of your home page content ... */ <section className="py-5">
        <Container fluid="lg">
          <h2 className="text-center mb-5" style={{ color: '#45974e' }}>Top Products</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="icon-box mb-3" style={{ color: '#45974e' }}>
                    
                    <i class="fa-solid fa-house" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <Card.Title className="fs-4">Home Loan</Card.Title>
                  <Card.Text className="mb-4">
                    Realize your dream home with attractive home loan options covering property purchase, construction, and renovation.
                  </Card.Text>
                  <Button as={Link} to="/loans" variant="outline-primary" style={{ color: '#45974e', borderColor: '#45974e' }} className='learn-more'>
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="icon-box mb-3" style={{ color: '#45974e' }}>
                    <i class="fa-solid fa-business-time" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <Card.Title className="fs-4">Business Loan</Card.Title>
                  <Card.Text className="mb-4">
                  Fuel your business growth with competitive interest rates and flexible repayment options tailored for entrepreneurs...
                  </Card.Text>
                  <Button as={Link} to="/loans" variant="outline-primary" style={{ color: '#45974e', borderColor: '#45974e' }} className='learn-more'>
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="icon-box mb-3" style={{ color: '#45974e' }}>
                    <i class="fa-solid fa-credit-card" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <Card.Title className="fs-4">Credit Card</Card.Title>
                  <Card.Text className="mb-4">
                    Protect your assets and plan for the future with our security solutions.
                  </Card.Text>
                  <Button as={Link} to="/credit-card" variant="outline-primary" style={{ color: '#45974e', borderColor: '#45974e' }} className='learn-more'>
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;