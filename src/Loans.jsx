import React,{useContext} from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Services.css"
import { AuthContext } from './AuthContext';

const Services = () => {
  const { isAuthenticated ,setIsAuthenticated,loading} = useContext(AuthContext);
  const loanTypes = [
    {
      id: 1,
      title: "Business Loan",
      description: "Fuel your business growth with competitive interest rates and flexible repayment options tailored for entrepreneurs and SMEs.",
      features: [
        "Loan amount up to ₹50 lakhs",
        "Interest rates from 10.5% p.a.",
        "Flexible tenure up to 5 years",
        "Quick approval process"
      ],
      interestRate: "10.5% - 16% p.a.",
      emi: "₹2,199 per lakh*",
      badge: "Popular"
    },
    {
      id: 2,
      title: "Home Loan",
      description: "Realize your dream home with attractive home loan options covering property purchase, construction, and renovation.",
      features: [
        "Up to 90% of property value",
        "Interest rates from 8.4% p.a.",
        "Tenure up to 30 years",
        "Balance transfer facility"
      ],
      interestRate: "8.4% - 11% p.a.",
      emi: "₹768 per lakh*",
      badge: "Lowest Rates"
    },
    {
      id: 3,
      title: "Education Loan",
      description: "Invest in your future with education loans covering domestic and international courses at premier institutions.",
      features: [
        "Coverage up to ₹1.5 crores",
        "Moratorium period available",
        "Collateral-free up to ₹7.5 lakhs",
        "Tax benefits under Section 80E"
      ],
      interestRate: "9.5% - 13% p.a.",
      emi: "₹1,126 per lakh*",
      badge: "Flexible"
    },
    {
      id: 4,
      title: "Personal Loan",
      description: "Meet your personal financial needs instantly with minimal documentation and quick disbursal.",
      features: [
        "Loan amount up to ₹25 lakhs",
        "Interest rates from 11% p.a.",
        "Tenure from 1 to 5 years",
        "No collateral required"
      ],
      interestRate: "11% - 18% p.a.",
      emi: "₹2,349 per lakh*",
      badge: "Instant"
    },
    {
      id: 5,
      title: "Car Loan",
      description: "Drive home your dream car with attractive financing options for new and used vehicles.",
      features: [
        "100% on-road funding",
        "Interest rates from 8.5% p.a.",
        "Tenure up to 7 years",
        "Special schemes for electric vehicles"
      ],
      interestRate: "8.5% - 12.5% p.a.",
      emi: "₹1,622 per lakh*",
      badge: null
    },
    {
      id: 6,
      title: "Medical Loan",
      description: "Handle medical emergencies without financial stress with customized healthcare financing solutions.",
      features: [
        "Coverage for treatments worldwide",
        "Quick sanction within 24 hours",
        "No pre-payment charges",
        "Insurance options available"
      ],
      interestRate: "12% - 15% p.a.",
      emi: "₹2,199 per lakh*",
      badge: "Emergency"
    }
  ];

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3" style={{ color: '#45974e' }}>Loan Solutions</h1>
        <p className="lead">Choose from our wide range of loan products designed to meet your financial needs</p>
      </div>

      <Row className="g-4">
        {loanTypes.map((loan) => (
          <Col key={loan.id} lg={4} md={6}>
            <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Card.Title className="fs-4 mb-0">{loan.title}</Card.Title>
                  {loan.badge && (
                    <Badge pill bg="success" className="ms-2">
                      {loan.badge}
                    </Badge>
                  )}
                </div>
                
                <Card.Text className="mb-4">{loan.description}</Card.Text>
                
                <div className="mb-4">
                  <h6 className="text-muted">Key Features:</h6>
                  <ul className="ps-3">
                    {loan.features.map((feature, index) => (
                      <li key={index} className="mb-1">{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="d-flex justify-content-between mb-4">
                  <div>
                    <small className="text-muted">Interest Rate</small>
                    <h6 className="mb-0">{loan.interestRate}</h6>
                  </div>
                  <div>
                    <small className="text-muted">EMI per lakh</small>
                    <h6 className="mb-0">{loan.emi}</h6>
                  </div>
                </div>
                
                <Button 
                  as={Link} 
                  to={isAuthenticated?"/contact":"/login"}
                  variant="outline-light" 
                  className="w-100 button"
                  
                >
                  Enquire Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <p className="text-muted small">*EMI calculated for 5 years tenure. Actual terms may vary based on eligibility.</p>
        <Button 
          as={Link} 
          to={isAuthenticated?"/contact":"/login"}
          size="lg" 
          className="mt-3"
          style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
        >
          Need Help Choosing? Talk to Our Expert
        </Button>
      </div>
    </Container>
  );
};

export default Services;