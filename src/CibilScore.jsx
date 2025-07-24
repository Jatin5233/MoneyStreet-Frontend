import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ProgressBar, Alert,Badge } from 'react-bootstrap';

const CIBILScoreCalculator = () => {
  const [formData, setFormData] = useState({
    paymentHistory: 35,
    creditUtilization: 30,
    creditAge: 15,
    creditMix: 10,
    newCredit: 10
  });
  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: parseInt(value)
    });
  };

  const calculateScore = () => {
    // Weighted calculation based on CIBIL score factors
    const calculatedScore = Math.min(
      900,
      300 + 
      (formData.paymentHistory * 1.8) + 
      (formData.creditUtilization * 1.5) + 
      (formData.creditAge * 1.2) + 
      (formData.creditMix * 0.9) + 
      (formData.newCredit * 0.6)
    );
    setScore(Math.round(calculatedScore));
    setShowResult(true);
  };

  const resetCalculator = () => {
    setFormData({
      paymentHistory: 35,
      creditUtilization: 30,
      creditAge: 15,
      creditMix: 10,
      newCredit: 10
    });
    setScore(null);
    setShowResult(false);
  };

  const getScoreCategory = () => {
    if (!score) return '';
    if (score >= 800) return 'Excellent';
    if (score >= 750) return 'Very Good';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    return 'Poor';
  };

  const getScoreColor = () => {
    if (!score) return '';
    if (score >= 750) return 'success';
    if (score >= 700) return 'primary';
    if (score >= 650) return 'warning';
    return 'danger';
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="display-5 fw-bold" style={{ color: '#45974e' }}>CIBIL Score Calculator</h1>
          <p className="lead">Estimate your credit score and learn how to improve it</p>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Calculator Form */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="mb-4" style={{ color: '#45974e' }}>Credit Health Factors</h4>
              
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>
                    Payment History ({formData.paymentHistory}%)
                    <span className="float-end">{formData.paymentHistory}/35</span>
                  </Form.Label>
                  <Form.Range 
                    min="0" 
                    max="35" 
                    value={formData.paymentHistory}
                    onChange={(e) => handleChange('paymentHistory', e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Timeliness of your EMI and credit card payments (35% weightage)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Credit Utilization ({formData.creditUtilization}%)
                    <span className="float-end">{formData.creditUtilization}/30</span>
                  </Form.Label>
                  <Form.Range 
                    min="0" 
                    max="30" 
                    value={formData.creditUtilization}
                    onChange={(e) => handleChange('creditUtilization', e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Percentage of available credit you're using (30% weightage)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Credit Age ({formData.creditAge}%)
                    <span className="float-end">{formData.creditAge}/15</span>
                  </Form.Label>
                  <Form.Range 
                    min="0" 
                    max="15" 
                    value={formData.creditAge}
                    onChange={(e) => handleChange('creditAge', e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Length of your credit history (15% weightage)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Credit Mix ({formData.creditMix}%)
                    <span className="float-end">{formData.creditMix}/10</span>
                  </Form.Label>
                  <Form.Range 
                    min="0" 
                    max="10" 
                    value={formData.creditMix}
                    onChange={(e) => handleChange('creditMix', e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Diversity of credit types (10% weightage)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    New Credit ({formData.newCredit}%)
                    <span className="float-end">{formData.newCredit}/10</span>
                  </Form.Label>
                  <Form.Range 
                    min="0" 
                    max="10" 
                    value={formData.newCredit}
                    onChange={(e) => handleChange('newCredit', e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Recent credit inquiries and accounts (10% weightage)
                  </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Button 
                    variant="primary" 
                    onClick={calculateScore}
                    style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
                  >
                    Calculate Score
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={resetCalculator}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Results Section */}
        <Col lg={6}>
          {showResult ? (
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h4 className="mb-4" style={{ color: '#45974e' }}>Your Credit Health Report</h4>
                
                <div className="text-center mb-4">
                  <h2 className="display-3 fw-bold mb-2" style={{ color: getScoreColor() === 'success' ? '#45974e' : '' }}>
                    {score}
                  </h2>
                  <Badge pill bg={getScoreColor()} className="mb-3">
                    {getScoreCategory()}
                  </Badge>
                  <ProgressBar 
                    now={score} 
                    min={300} 
                    max={900} 
                    variant={getScoreColor()} 
                    className="mb-3"
                    style={{ height: '20px' }}
                  />
                  <div className="d-flex justify-content-between">
                    <span>300</span>
                    <span>900</span>
                  </div>
                </div>

                <Alert variant={getScoreColor()} className="mb-4">
                  <h5>Interpretation:</h5>
                  {score >= 800 ? (
                    <p>Excellent! You're likely to get the best interest rates and credit approvals.</p>
                  ) : score >= 750 ? (
                    <p>Very Good! You qualify for most loans with favorable terms.</p>
                  ) : score >= 700 ? (
                    <p>Good. You'll get approved for credit but may not get the best rates.</p>
                  ) : score >= 650 ? (
                    <p>Fair. Some lenders may approve you but with higher interest rates.</p>
                  ) : (
                    <p>Poor. You may face difficulties getting credit approved.</p>
                  )}
                </Alert>

                <div className="mb-4">
                  <h5>Factor Analysis:</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex justify-content-between">
                      <span>Payment History</span>
                      <strong>{formData.paymentHistory}/35</strong>
                    </li>
                    <li className="mb-2 d-flex justify-content-between">
                      <span>Credit Utilization</span>
                      <strong>{formData.creditUtilization}/30</strong>
                    </li>
                    <li className="mb-2 d-flex justify-content-between">
                      <span>Credit Age</span>
                      <strong>{formData.creditAge}/15</strong>
                    </li>
                    <li className="mb-2 d-flex justify-content-between">
                      <span>Credit Mix</span>
                      <strong>{formData.creditMix}/10</strong>
                    </li>
                    <li className="mb-2 d-flex justify-content-between">
                      <span>New Credit</span>
                      <strong>{formData.newCredit}/10</strong>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5>Tips to Improve:</h5>
                  <ul>
                    {score < 800 && (
                      <>
                        {formData.paymentHistory < 25 && (
                          <li>Pay all bills on time - even one late payment can hurt your score</li>
                        )}
                        {formData.creditUtilization < 20 && (
                          <li>Keep credit card balances below 30% of your limit</li>
                        )}
                        {formData.creditAge < 10 && (
                          <li>Avoid closing old credit accounts to maintain history</li>
                        )}
                        {formData.creditMix < 5 && (
                          <li>Consider diversifying with different types of credit</li>
                        )}
                        {formData.newCredit < 5 && (
                          <li>Limit new credit applications to 1-2 per year</li>
                        )}
                        {score >= 700 && (
                          <li>You're doing well! Maintain these good habits</li>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-5">
                <i className="bi bi-credit-card" style={{ fontSize: '3rem', color: '#45974e' }}></i>
                <h4 className="my-3">Your CIBIL Score Estimate Will Appear Here</h4>
                <p className="text-muted">Adjust the credit health factors and click "Calculate Score" to see your estimated credit score</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Educational Section */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="mb-4" style={{ color: '#45974e' }}>Understanding CIBIL Scores</h4>
              <Row>
                <Col md={6}>
                  <h5>What is a CIBIL Score?</h5>
                  <p>
                    Your CIBIL Score is a 3-digit numeric summary of your credit history (300-900), 
                    calculated by TransUnion CIBIL based on your credit behavior.
                  </p>
                  <h5 className="mt-4">Why It Matters</h5>
                  <ul>
                    <li>Determines your loan and credit card eligibility</li>
                    <li>Affects the interest rates you receive</li>
                    <li>Used by most banks and NBFCs in India</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5>Score Ranges</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <Badge bg="success" className="me-2">800-900</Badge>
                      Excellent - Best loan terms
                    </li>
                    <li className="mb-2">
                      <Badge bg="primary" className="me-2">750-799</Badge>
                      Very Good - Favorable terms
                    </li>
                    <li className="mb-2">
                      <Badge bg="info" className="me-2">700-749</Badge>
                      Good - Approval likely
                    </li>
                    <li className="mb-2">
                      <Badge bg="warning" className="me-2">650-699</Badge>
                      Fair - Higher rates
                    </li>
                    <li className="mb-2">
                      <Badge bg="danger" className="me-2">300-649</Badge>
                      Poor - Approval difficult
                    </li>
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
              <h4 className="mb-3">Get Your Official CIBIL Report</h4>
              <p className="mb-4">
                This calculator provides an estimate. For your official CIBIL score and report:
              </p>
              <Button 
                variant="success" 
                size="lg"
                style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
              >
                Check Official CIBIL Score
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CIBILScoreCalculator;