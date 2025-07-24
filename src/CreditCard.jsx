import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CreditCardEnquiry = () => {
  const [formData, setFormData] = useState({
    monthlyIncome: 50000,
    employmentType: 'salaried',
    creditScore: 750,
    existingCards: 0,
    cardType: 'rewards'
  });

  const [eligibleCards, setEligibleCards] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const employmentTypes = [
    { value: 'salaried', label: 'Salaried' },
    { value: 'selfEmployed', label: 'Self-Employed' },
    { value: 'professional', label: 'Professional' }
  ];

  const cardTypes = [
    { value: 'rewards', label: 'Rewards Cards' },
    { value: 'travel', label: 'Travel Cards' },
    { value: 'cashback', label: 'Cashback Cards' },
    { value: 'fuel', label: 'Fuel Cards' },
    { value: 'premium', label: 'Premium Cards' }
  ];

  const creditCards = [
    {
      id: 1,
      name: "MoneyStreet Rewards+",
      type: "rewards",
      minIncome: 30000,
      minScore: 700,
      annualFee: 999,
      features: ["5X rewards on online shopping", "1% fuel surcharge waiver", "Complimentary airport lounge access"],
      joiningBonus: "2,500 reward points"
    },
    {
      id: 2,
      name: "MoneyStreet Travel Elite",
      type: "travel",
      minIncome: 50000,
      minScore: 750,
      annualFee: 2999,
      features: ["Air miles on every spend", "Free airline companion ticket", "Travel insurance up to ₹20L"],
      joiningBonus: "5,000 air miles"
    },
    {
      id: 3,
      name: "MoneyStreet Cashback Pro",
      type: "cashback",
      minIncome: 25000,
      minScore: 650,
      annualFee: 499,
      features: ["5% cashback on groceries", "2% cashback on all spends", "No minimum redemption"],
      joiningBonus: "₹500 cashback"
    },
    {
      id: 4,
      name: "MoneyStreet Fuel Smart",
      type: "fuel",
      minIncome: 20000,
      minScore: 600,
      annualFee: 299,
      features: ["10% cashback on fuel", "2% cashback on auto services", "Free RSA membership"],
      joiningBonus: "₹300 fuel voucher"
    },
    {
      id: 5,
      name: "MoneyStreet Platinum",
      type: "premium",
      minIncome: 75000,
      minScore: 800,
      annualFee: 4999,
      features: ["Unlimited lounge access", "Golf course privileges", "24/7 concierge service"],
      joiningBonus: "10,000 reward points"
    }
  ];

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const checkEligibility = () => {
    const eligible = creditCards.filter(card => 
      formData.monthlyIncome >= card.minIncome &&
      formData.creditScore >= card.minScore &&
      (formData.cardType === 'all' || card.type === formData.cardType)
    );
    
    setEligibleCards(eligible);
    setShowResults(true);
  };

  const resetForm = () => {
    setFormData({
      monthlyIncome: 50000,
      employmentType: 'salaried',
      creditScore: 750,
      existingCards: 0,
      cardType: 'rewards'
    });
    setEligibleCards([]);
    setShowResults(false);
  };

  const getCardColor = (type) => {
    switch(type) {
      case 'rewards': return '#45974e';
      case 'travel': return '#1976d2';
      case 'cashback': return '#ff9800';
      case 'fuel': return '#f44336';
      case 'premium': return '#9c27b0';
      default: return '#607d8b';
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="display-5 fw-bold" style={{ color: '#45974e' }}>Credit Card Enquiry</h1>
          <p className="lead">Find the best credit cards matching your financial profile</p>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Enquiry Form */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="mb-4" style={{ color: '#45974e' }}>Your Profile</h4>
              
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Monthly Income (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                    min="10000"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Employment Type</Form.Label>
                  <Form.Select
                    value={formData.employmentType}
                    onChange={(e) => handleChange('employmentType', e.target.value)}
                  >
                    {employmentTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>CIBIL Score (300-900)</Form.Label>
                  <Form.Range
                    min="300"
                    max="900"
                    value={formData.creditScore}
                    onChange={(e) => handleChange('creditScore', e.target.value)}
                  />
                  <div className="d-flex justify-content-between">
                    <span>300</span>
                    <strong>{formData.creditScore}</strong>
                    <span>900</span>
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Existing Credit Cards</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.existingCards}
                    onChange={(e) => handleChange('existingCards', e.target.value)}
                    min="0"
                    max="10"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Preferred Card Type</Form.Label>
                  <Form.Select
                    value={formData.cardType}
                    onChange={(e) => handleChange('cardType', e.target.value)}
                  >
                    <option value="all">All Card Types</option>
                    {cardTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Button
                    variant="primary"
                    onClick={checkEligibility}
                    style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
                  >
                    Check Eligibility
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Results Section */}
        <Col lg={8}>
          {showResults ? (
            eligibleCards.length > 0 ? (
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <h4 className="mb-4" style={{ color: '#45974e' }}>
                    Recommended Credit Cards ({eligibleCards.length})
                  </h4>

                  {eligibleCards.map((card) => (
                    <Card key={card.id} className="mb-4 border-0 shadow-sm">
                      <Card.Body>
                        <Row className="align-items-center">
                          <Col md={3} className="text-center">
                            <div 
                              className="p-3 rounded mb-3 mb-md-0"
                              style={{ 
                                backgroundColor: getCardColor(card.type) + '20',
                                borderLeft: `4px solid ${getCardColor(card.type)}`
                              }}
                            >
                              <i className="bi bi-credit-card-2-front" style={{ fontSize: '2rem', color: getCardColor(card.type) }}></i>
                            </div>
                          </Col>
                          <Col md={6}>
                            <h5>{card.name}</h5>
                            <Badge bg="light" text="dark" className="me-2 mb-2">
                              Annual Fee: ₹{card.annualFee}
                            </Badge>
                            <Badge bg="light" text="dark" className="me-2 mb-2">
                              Min Income: ₹{card.minIncome.toLocaleString('en-IN')}
                            </Badge>
                            <Badge bg="light" text="dark" className="me-2 mb-2">
                              Min Score: {card.minScore}
                            </Badge>
                            <div className="mt-2">
                              <strong>Joining Bonus:</strong> {card.joiningBonus}
                            </div>
                          </Col>
                          <Col md={3} className="text-center text-md-end mt-3 mt-md-0">
                            <Button
                              as={Link}
                              to={`/apply-credit-card/${card.id}`}
                              variant="outline-primary"
                              size="sm"
                              className="w-100 mb-2"
                              style={{ color: '#45974e', borderColor: '#45974e' }}
                            >
                              Apply Now
                            </Button>
                            <Button
                              as={Link}
                              to={`/card-details/${card.id}`}
                              variant="light"
                              size="sm"
                              className="w-100"
                            >
                              View Details
                            </Button>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col>
                            <h6 className="mb-2">Key Features:</h6>
                            <ul className="mb-0">
                              {card.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
            ) : (
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-5">
                  <i className="bi bi-credit-card" style={{ fontSize: '3rem', color: '#45974e' }}></i>
                  <h4 className="my-3">No Cards Match Your Current Profile</h4>
                  <p className="text-muted">
                    We couldn't find credit cards matching your current criteria. 
                    Consider improving your credit score or income level.
                  </p>
                  <Button
                    variant="outline-primary"
                    style={{ color: '#45974e', borderColor: '#45974e' }}
                    onClick={() => setFormData({...formData, cardType: 'all'})}
                  >
                    Show All Card Options
                  </Button>
                </Card.Body>
              </Card>
            )
          ) : (
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-5">
                <i className="bi bi-search" style={{ fontSize: '3rem', color: '#45974e' }}></i>
                <h4 className="my-3">Your Credit Card Matches Will Appear Here</h4>
                <p className="text-muted">
                  Enter your financial details and click "Check Eligibility" to see cards matching your profile
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Credit Card Tips Section */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="mb-4" style={{ color: '#45974e' }}>Credit Card Tips</h4>
              <Row>
                <Col md={6}>
                  <h5>Improving Approval Chances</h5>
                  <ul>
                    <li>Maintain a CIBIL score above 750</li>
                    <li>Keep credit utilization below 30%</li>
                    <li>Have a stable income source for at least 1 year</li>
                    <li>Limit credit card applications to 2-3 per year</li>
                    <li>Ensure no late payments on existing credit</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5>Choosing the Right Card</h5>
                  <ul>
                    <li><strong>Rewards Cards:</strong> Best for everyday spending</li>
                    <li><strong>Travel Cards:</strong> Ideal for frequent flyers</li>
                    <li><strong>Cashback Cards:</strong> Great for budget-conscious users</li>
                    <li><strong>Fuel Cards:</strong> Perfect for regular commuters</li>
                    <li><strong>Premium Cards:</strong> For high-net-worth individuals</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CTA Section */}
      <Row className="mt-4">
        <Col>
          <Card className="border-0" style={{ backgroundColor: '#f0f8f1' }}>
            <Card.Body className="p-4 text-center">
              <h4 className="mb-3">Need Help Choosing?</h4>
              <p className="mb-4">
                Our financial experts can help you select the perfect credit card for your needs
              </p>
              <Button
                variant="success"
                size="lg"
                style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
                as={Link}
                to="/contact"
              >
                Talk to a Card Advisor
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreditCardEnquiry;