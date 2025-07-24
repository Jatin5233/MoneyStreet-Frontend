import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, ListGroup } from 'react-bootstrap';

const LoanEligibilityCalculator = () => {
  const [formData, setFormData] = useState({
    monthlyIncome: 75000,
    existingEMIs: 15000,
    employmentType: 'salaried',
    creditScore: 750,
    loanAmount: 500000,
    loanTenure: 5
  });
  const [eligibility, setEligibility] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const employmentTypes = [
    { value: 'salaried', label: 'Salaried' },
    { value: 'selfEmployed', label: 'Self-Employed' },
    { value: 'professional', label: 'Professional' }
  ];

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const calculateEligibility = () => {
    // Simplified eligibility calculation logic
    let eligibilityPercentage = 0;
    
    // Base eligibility based on income-to-EMI ratio (should be <= 50%)
    const emiCapacity = formData.monthlyIncome * 0.5 - formData.existingEMIs;
    const possibleEMI = (formData.loanAmount * (0.1/12)) / 
                       (1 - Math.pow(1 + (0.1/12), -formData.loanTenure * 12));
    
    if (emiCapacity >= possibleEMI) {
      eligibilityPercentage += 40;
    } else {
      eligibilityPercentage += (emiCapacity / possibleEMI) * 40;
    }
    
    // Credit score impact (max 30%)
    eligibilityPercentage += (formData.creditScore / 900) * 30;
    
    // Employment type impact (max 20%)
    if (formData.employmentType === 'salaried') eligibilityPercentage += 20;
    else if (formData.employmentType === 'professional') eligibilityPercentage += 15;
    else eligibilityPercentage += 10;
    
    // Loan amount impact (max 10%)
    if (formData.loanAmount <= 1000000) eligibilityPercentage += 10;
    else if (formData.loanAmount <= 5000000) eligibilityPercentage += 8;
    else eligibilityPercentage += 5;
    
    const finalEligibility = Math.min(100, Math.round(eligibilityPercentage));
    setEligibility(finalEligibility);
    setShowResult(true);
  };

  const resetCalculator = () => {
    setFormData({
      monthlyIncome: 75000,
      existingEMIs: 15000,
      employmentType: 'salaried',
      creditScore: 750,
      loanAmount: 500000,
      loanTenure: 5
    });
    setEligibility(null);
    setShowResult(false);
  };

  const getEligibilityColor = () => {
    if (!eligibility) return 'secondary';
    if (eligibility >= 80) return 'success';
    if (eligibility >= 60) return 'primary';
    if (eligibility >= 40) return 'warning';
    return 'danger';
  };

  const getEligibilityStatus = () => {
    if (!eligibility) return '';
    if (eligibility >= 80) return 'Highly Eligible';
    if (eligibility >= 60) return 'Eligible';
    if (eligibility >= 40) return 'Partially Eligible';
    return 'Not Eligible';
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="display-5 fw-bold" style={{ color: '#45974e' }}>Loan Eligibility Calculator</h1>
          <p className="lead">Check your qualification for loans based on financial profile</p>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Calculator Form */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="mb-4" style={{ color: '#45974e' }}>Financial Information</h4>
              
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>
                    Monthly Income (₹)
                  </Form.Label>
                  <Form.Control 
                    type="number" 
                    value={formData.monthlyIncome}
                    onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                    min="10000"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Existing Monthly EMIs (₹)
                  </Form.Label>
                  <Form.Control 
                    type="number" 
                    value={formData.existingEMIs}
                    onChange={(e) => handleChange('existingEMIs', e.target.value)}
                    min="0"
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
                  <Form.Label>
                    CIBIL Score (300-900)
                  </Form.Label>
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
                  <Form.Label>
                    Desired Loan Amount (₹)
                  </Form.Label>
                  <Form.Control 
                    type="number" 
                    value={formData.loanAmount}
                    onChange={(e) => handleChange('loanAmount', e.target.value)}
                    min="10000"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Preferred Tenure (years)
                  </Form.Label>
                  <Form.Range 
                    min="1" 
                    max="7" 
                    value={formData.loanTenure}
                    onChange={(e) => handleChange('loanTenure', e.target.value)}
                  />
                  <div className="d-flex justify-content-between">
                    <span>1</span>
                    <strong>{formData.loanTenure}</strong>
                    <span>7</span>
                  </div>
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Button 
                    variant="primary" 
                    onClick={calculateEligibility}
                    style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
                  >
                    Check Eligibility
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
                <h4 className="mb-4" style={{ color: '#45974e' }}>Eligibility Results</h4>
                
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <svg width="120" height="110" viewBox="0 0 36 36" className="circular-chart">
                      <path className="circle-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f0f0f0"
                        strokeWidth="3"
                      />
                      <path className="circle"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={getEligibilityColor() === 'success' ? '#45974e' : ''}
                        strokeWidth="3"
                        strokeDasharray={`${eligibility}, 100`}
                      />
                      <text x="7" y="22.5" className="percentage" fill={getEligibilityColor() === 'success' ? '#45974e' : ''} style={{fontSize:"0.8rem"}}>
                        {eligibility}%
                      </text>
                    </svg>
                  </div>
                  <h3 className="mt-3">
                    <Badge bg={getEligibilityColor()} className="me-2">
                      {getEligibilityStatus()}
                    </Badge>
                  </h3>
                </div>

                <Alert variant={getEligibilityColor()} className="mb-4">
                  {eligibility >= 80 ? (
                    <p>Excellent! You qualify for the best interest rates and highest loan amounts.</p>
                  ) : eligibility >= 60 ? (
                    <p>Good! You're eligible for most loan products with competitive rates.</p>
                  ) : eligibility >= 40 ? (
                    <p>Fair. You may qualify for some loans but with higher interest rates.</p>
                  ) : (
                    <p>Limited eligibility. Consider improving your financial profile before applying.</p>
                  )}
                </Alert>

                <div className="mb-4">
                  <h5>Key Eligibility Factors:</h5>
                  <ListGroup>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      Income-to-EMI Ratio
                      <Badge bg="light" text="dark">
                        {((formData.monthlyIncome * 0.5 - formData.existingEMIs) / formData.monthlyIncome * 100).toFixed(0)}%
                      </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      Credit Score
                      <Badge bg="light" text="dark">
                        {formData.creditScore}
                      </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      Employment Stability
                      <Badge bg="light" text="dark">
                        {formData.employmentType === 'salaried' ? 'High' : 
                         formData.employmentType === 'professional' ? 'Medium' : 'Variable'}
                      </Badge>
                    </ListGroup.Item>
                  </ListGroup>
                </div>

                <div>
                  <h5>Improvement Suggestions:</h5>
                  <ul>
                    {(eligibility < 80) && (
                      <>
                        {(formData.monthlyIncome * 0.5 - formData.existingEMIs) / formData.monthlyIncome * 100 < 40 && (
                          <li>Reduce existing EMIs or increase your income to improve debt-to-income ratio</li>
                        )}
                        {formData.creditScore < 700 && (
                          <li>Improve your credit score by paying bills on time and reducing credit utilization</li>
                        )}
                        {formData.employmentType === 'selfEmployed' && (
                          <li>Maintain consistent income records for at least 2 years</li>
                        )}
                        {eligibility < 60 && (
                          <li>Consider applying for a smaller loan amount or longer tenure</li>
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
                <i className="bi bi-clipboard-check" style={{ fontSize: '3rem', color: '#45974e' }}></i>
                <h4 className="my-3">Your Loan Eligibility Results Will Appear Here</h4>
                <p className="text-muted">Enter your financial details and click "Check Eligibility" to see your qualification</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Eligibility Criteria Section */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="mb-4" style={{ color: '#45974e' }}>General Loan Eligibility Criteria</h4>
              <Row>
                <Col md={6}>
                  <h5>Basic Requirements</h5>
                  <ul>
                    <li>Minimum age: 21 years</li>
                    <li>Maximum age: 60-65 years (at loan maturity)</li>
                    <li>Minimum income: ₹15,000-₹25,000 per month</li>
                    <li>CIBIL score: 650+ (varies by lender)</li>
                    <li>Employment: Minimum 1-2 years with current employer</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5>Documentation Needed</h5>
                  <ul>
                    <li>Identity proof (Aadhaar, PAN, Passport)</li>
                    <li>Address proof (Utility bills, Aadhaar)</li>
                    <li>Income proof (Salary slips/Bank statements)</li>
                    <li>Employment proof (Offer letter/Employment certificate)</li>
                    <li>Photographs (Passport size)</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Loan Products Section */}
      <Row className="mt-4">
        <Col>
          <Card className="border-0" style={{ backgroundColor: '#f0f8f1' }}>
            <Card.Body className="p-4 text-center">
              <h4 className="mb-3">Ready to Apply?</h4>
              <p className="mb-4">
                Based on your eligibility, explore these loan options:
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Button 
                  variant="outline-success" 
                  size="lg"
                  style={{ color: '#45974e', borderColor: '#45974e' }}
                >
                  Personal Loans
                </Button>
                <Button 
                  variant="outline-success" 
                  size="lg"
                  style={{ color: '#45974e', borderColor: '#45974e' }}
                >
                  Home Loans
                </Button>
                <Button 
                  variant="outline-success" 
                  size="lg"
                  style={{ color: '#45974e', borderColor: '#45974e' }}
                >
                  Business Loans
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoanEligibilityCalculator;