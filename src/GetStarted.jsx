import React ,{useContext} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./GetStarted.css"
import { AuthContext } from './AuthContext';

const GetStarted = () => {
  const { isAuthenticated} = useContext(AuthContext);
  const services = [
    {
      id: 1,
      title: "Loan Solutions",
      description: "Explore personalized loan options for all your needs",
      icon: "fa-solid fa-money-bills",
      path: "/loans",
      color: "#45974e"
    },
    {
      id: 2,
      title: "Insurance Plans",
      description: "Protect what matters with our comprehensive coverage",
      icon: "fa-solid fa-shield-halved",
      path: "/insurance",
      color: "#1976d2"
    },
    {
      id: 3,
      title: "Credit Cards",
      description: "Find the perfect card matching your spending habits",
      icon: "fa-regular fa-credit-card",
      path: "/credit-card",
      color: "#ff9800"
    },
    {
      id: 4,
      title: "EMI Calculator",
      description: "Calculate your monthly payments instantly",
      icon: "fa-solid fa-calculator",
      path: "/emi-calculator",
      color: "#9c27b0"
    }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-4 fw-bold mb-3" style={{ color: '#45974e' }}>Get Started with MoneyStreet</h1>
          <p className="lead">Choose from our financial solutions to begin your journey</p>
        </Col>
      </Row>

      <Row className="g-4">
        {services.map((service) => (
          <Col key={service.id} lg={3} md={6}>
            <Card className="h-100 border-0 shadow-sm text-center hover-scale transition-all">
              <Card.Body className="p-4 d-flex flex-column">
                <div 
                  className="icon-wrapper mx-auto mb-4"
                  style={{ 
                    backgroundColor: `${service.color}20`,
                    color: service.color,
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <i className={`bi ${service.icon}`} style={{ fontSize: '2rem' }}></i>
                </div>
                <h3 className="h4 mb-3">{service.title}</h3>
                <Card.Text className="mb-4 flex-grow-1">
                  {service.description}
                </Card.Text>
                <Button
                  as={Link}
                  to={service.path}
                  className="mt-auto"
                  style={{ 
                    backgroundColor: service.color, 
                    borderColor: service.color 
                  }}
                >
                  Explore Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col className="text-center">
          <div className="p-4 rounded-3" style={{ backgroundColor: '#f0f8f1' }}>
            <h3 className="mb-3">Not sure where to start?</h3>
            <p className="mb-4">Our financial experts can guide you to the right solution</p>
            <Button 
              as={Link} 
              to={isAuthenticated?"/contact":"/login"}
              size="lg"
              style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
            >
              Talk to an Expert
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GetStarted;