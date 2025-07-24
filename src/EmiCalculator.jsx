import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 1200; // Monthly interest rate
    const time = parseFloat(loanTenure) * 12; // Months

    const emiValue = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
    const totalPaymentValue = emiValue * time;
    const totalInterestValue = totalPaymentValue - principal;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
    setTotalPayment(totalPaymentValue.toFixed(2));
    setShowResult(true);
  };

  const resetCalculator = () => {
    setLoanAmount(1000000);
    setInterestRate(8.5);
    setLoanTenure(5);
    setShowResult(false);
  };

  const data = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: ['#45974e', '#8bc34a'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ₹${context.raw.toLocaleString('en-IN')}`;
          }
        }
      }
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="display-5 fw-bold" style={{ color: '#45974e' }}>EMI Calculator</h1>
          <p className="lead">Calculate your monthly loan payments easily</p>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Calculator Form */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Loan Amount (₹)</Form.Label>
                  <Form.Control 
                    type="range" 
                    min="50000" 
                    max="50000000" 
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                  <div className="d-flex justify-content-between mt-2">
                    <span>₹50,000</span>
                    <strong>₹{parseInt(loanAmount).toLocaleString('en-IN')}</strong>
                    <span>₹5,00,00,000</span>
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Interest Rate (% p.a.)</Form.Label>
                  <Form.Control 
                    type="range" 
                    min="5" 
                    max="25" 
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                  <div className="d-flex justify-content-between mt-2">
                    <span>5%</span>
                    <strong>{interestRate}%</strong>
                    <span>25%</span>
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Loan Tenure (years)</Form.Label>
                  <Form.Control 
                    type="range" 
                    min="1" 
                    max="30" 
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                  />
                  <div className="d-flex justify-content-between mt-2">
                    <span>1 year</span>
                    <strong>{loanTenure} {loanTenure > 1 ? 'years' : 'year'}</strong>
                    <span>30 years</span>
                  </div>
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Button 
                    variant="primary" 
                    onClick={calculateEMI}
                    style={{ backgroundColor: '#45974e', borderColor: '#45974e' }}
                  >
                    Calculate EMI
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
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4 className="mb-4" style={{ color: '#45974e' }}>Loan Breakdown</h4>
                
                <Row className="mb-4">
                  <Col>
                    <div className="text-center p-3 bg-light rounded">
                      <h6 className="text-muted">Monthly EMI</h6>
                      <h3 className="mb-0">₹{parseFloat(emi).toLocaleString('en-IN')}</h3>
                    </div>
                  </Col>
                  <Col>
                    <div className="text-center p-3 bg-light rounded">
                      <h6 className="text-muted">Total Interest</h6>
                      <h3 className="mb-0">₹{parseFloat(totalInterest).toLocaleString('en-IN')}</h3>
                    </div>
                  </Col>
                  <Col>
                    <div className="text-center p-3 bg-light rounded">
                      <h6 className="text-muted">Total Payment</h6>
                      <h3 className="mb-0">₹{parseFloat(totalPayment).toLocaleString('en-IN')}</h3>
                    </div>
                  </Col>
                </Row>

                <div className="mb-4" style={{ height: '250px' }}>
                  <Pie data={data} options={options} />
                </div>

                <Alert variant="success" className="mt-4">
                  <h6>Loan Summary</h6>
                  <ul className="mb-0">
                    <li>Principal Amount: ₹{parseInt(loanAmount).toLocaleString('en-IN')}</li>
                    <li>Interest Rate: {interestRate}% per annum</li>
                    <li>Loan Tenure: {loanTenure} {loanTenure > 1 ? 'years' : 'year'} ({loanTenure * 12} months)</li>
                  </ul>
                </Alert>
              </Card.Body>
            </Card>
          ) : (
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-5">
                <i className="bi bi-calculator" style={{ fontSize: '3rem', color: '#45974e' }}></i>
                <h4 className="my-3">Your EMI Results Will Appear Here</h4>
                <p className="text-muted">Enter loan details and click "Calculate EMI" to see your payment breakdown</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

 
  
    </Container>
  );
};

export default EMICalculator;