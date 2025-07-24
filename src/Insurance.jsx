import React,{useContext} from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Services.css"
import { AuthContext } from './AuthContext';


const Insurance = () => {
  const { isAuthenticated ,setIsAuthenticated,loading} = useContext(AuthContext);
  const insuranceTypes = [
    {
      id: 1,
      title: "Health Insurance",
      description: "Comprehensive medical coverage for you and your family with cashless hospitalization across India.",
      features: [
        "Coverage up to ₹2 crores",
        "5000+ network hospitals",
        "Pre & post hospitalization cover",
        "Annual health checkups"
      ],
      premium: "₹8,000 - ₹50,000/year",
      claimSettlement: "97%",
      badge: "Popular"
    },
    {
      id: 2,
      title: "Term Life Insurance",
      description: "Affordable pure protection plans with high coverage to secure your family's future.",
      features: [
        "Coverage up to ₹5 crores",
        "Premium as low as ₹500/month",
        "Tax benefits under Section 80C & 10D",
        "Critical illness riders available"
      ],
      premium: "₹6,000 - ₹1,00,000/year",
      claimSettlement: "99.1%",
      badge: "Essential"
    },
    {
      id: 3,
      title: "Motor Insurance",
      description: "Complete protection for your car/bike with add-ons like zero depreciation and engine protection.",
      features: [
        "Own damage & third party cover",
        "24/7 roadside assistance",
        "No claim bonus up to 50%",
        "Cashless repairs at 3800+ garages"
      ],
      premium: "₹2,000 - ₹20,000/year",
      claimSettlement: "94.5%",
      badge: null
    },
    {
      id: 4,
      title: "Travel Insurance",
      description: "Worldwide coverage for medical emergencies, trip cancellations, and lost baggage during travel.",
      features: [
        "Coverage up to $500,000",
        "Covers adventure sports",
        "Trip delay/cancellation protection",
        "24/7 global assistance"
      ],
      premium: "₹250 - ₹2,500/day",
      claimSettlement: "96.2%",
      badge: "International"
    },
    {
      id: 5,
      title: "Home Insurance",
      description: "Protect your home and valuables against natural calamities, fire, and theft.",
      features: [
        "Structure + content coverage",
        "Alternative accommodation cover",
        "Earthquake & flood protection",
        "Electronic equipment cover"
      ],
      premium: "₹3,000 - ₹25,000/year",
      claimSettlement: "95.3%",
      badge: null
    },
    {
      id: 6,
      title: "Critical Illness",
      description: "Lump sum payout on diagnosis of 32+ critical illnesses including cancer and heart disease.",
      features: [
        "Coverage up to ₹1 crore",
        "Single payout on diagnosis",
        "No hospitalization bills required",
        "Survival period as low as 30 days"
      ],
      premium: "₹10,000 - ₹75,000/year",
      claimSettlement: "98.4%",
      badge: "Protection"
    }
  ];

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3" style={{ color: '#45974e' }}>Insurance Solutions</h1>
        <p className="lead">Protect what matters most with our comprehensive insurance plans</p>
      </div>

      <Row className="g-4">
        {insuranceTypes.map((insurance) => (
          <Col key={insurance.id} lg={4} md={6}>
            <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Card.Title className="fs-4 mb-0">{insurance.title}</Card.Title>
                  {insurance.badge && (
                    <Badge pill bg="success" className="ms-2">
                      {insurance.badge}
                    </Badge>
                  )}
                </div>
                
                <Card.Text className="mb-4">{insurance.description}</Card.Text>
                
                <div className="mb-4">
                  <h6 className="text-muted">Key Benefits:</h6>
                  <ul className="ps-3">
                    {insurance.features.map((feature, index) => (
                      <li key={index} className="mb-1">{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="d-flex justify-content-between mb-4">
                  <div>
                    <small className="text-muted">Annual Premium</small>
                    <h6 className="mb-0">{insurance.premium}</h6>
                  </div>
                  <div>
                    <small className="text-muted">Claim Settlement</small>
                    <h6 className="mb-0">{insurance.claimSettlement}%</h6>
                  </div>
                </div>
                
                <div className="d-grid gap-2">
                  <Button 
                    as={Link} 
                    to={isAuthenticated?"/contact":"/login"}
                    variant="outline-primary" 
                    style={{ color: '#45974e', borderColor: '#45974e' }}
                    className='button'
                  >
                    Get Quote
                  </Button>
                  
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <p className="text-muted small">*Premium varies based on age, coverage amount, and other factors</p>
        <Button 
          as={Link} 
          to={isAuthenticated?"/contact":"/login"}
          size="lg" 
          className="mt-3"
          style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
        >
          Need Help Choosing? Consult Our Advisor
        </Button>
      </div>
    </Container>
  );
};

export default Insurance;