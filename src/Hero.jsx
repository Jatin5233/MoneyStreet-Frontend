

import React,{useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Button, Row, Col, Card,NavDropdown } from 'react-bootstrap';
import {  Routes, Route, Link ,useNavigate} from 'react-router-dom';
import "./Hero.css"
import axios from 'axios';
axios.defaults.withCredentials = true;

// Import your page components (you'll need to create these)
import Home from './Home';
import Loans from './Loans';
import Insurance from './Insurance';
import CreditCardEnquiry from './CreditCard';
import About from './About';
import Contact from './Contact';
import EmiCalculator from './EmiCalculator'
import CIBILScoreCalculator from './CibilScore';
import LoanEligibilityCalculator from './LoanEligibilty';
import GetStarted from './GetStarted';
import SignInPage from './SignIn';
import LoginPage from './Login';
import { AuthContext } from './AuthContext';

const Hero = () => {
  const navigate = useNavigate();
const { isAuthenticated ,setIsAuthenticated,loading} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {}, {
        withCredentials: true,
      });
      console.log(res.data.message); // Logged out successfully
       setIsAuthenticated(false); 
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  
  console.log(isAuthenticated)
  return (
    
      <div className="MoneyStreet-app">
        {/* Navbar with React Router Links */}
        <Navbar expand="lg" className="navbar-custom">
          <Container>
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
              <img
                src="/fin4.png"
                width="50"
                height="50"
                className="d-inline-block align-top me-2"
                alt="MoneyStreet logo"
              />
              <span className="logo-text">MoneyStreet</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                
                  <NavDropdown 
              title="Products" 
              id="products-dropdown"
              className="text-white"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/loans">Loans</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/insurance">Insurance</NavDropdown.Item>
             
              <NavDropdown.Item as={Link} to="/credit-card">Credit Card</NavDropdown.Item>
              <NavDropdown.Divider />
              
            </NavDropdown>
                <Nav.Link as={Link} to="/about" className="text-white">About</Nav.Link>
                 <NavDropdown 
              title="Calculate" 
              id="products-dropdown"
              className="text-white"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/emi-calculator">EMI Calculator</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cibil-score">Cibil Score</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/loan-eligibility">Eligibility</NavDropdown.Item>
              <NavDropdown.Divider />
              
            </NavDropdown>
            
            <Nav.Link as={Link} to={isAuthenticated?"/contact":"/login"} className="text-white">Contact</Nav.Link>
              </Nav>
              {!isAuthenticated &&!loading? (
  <div className="ml-4">
    <Button as={Link} to="/signIn" variant="outline-light" className="ms-3">Sign In</Button>
    <Button as={Link} to="/login" variant="outline-light" className="ms-3">Login</Button>
  </div>
) : (
  <div className="ml-4">
    <Button onClick={handleLogout} variant="outline-light" className="ms-3">Logout</Button>
  </div>
)}
              {/* <Button as={Link} to="/contact" variant="light" className="ms-2">Contact</Button> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Content with Routes */}
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/get-started" element={<GetStarted />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/credit-card" element={<CreditCardEnquiry />} />
            <Route path="/about" element={<About />} />
            <Route path="/emi-calculator" element={<EmiCalculator />} />
            <Route path="/cibil-score" element={<CIBILScoreCalculator />} />
            <Route path="/loan-eligibility" element={<LoanEligibilityCalculator />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signIn" element={<SignInPage/>} />
            <Route path="/login" element={<LoginPage/>} />
        
          </Routes>
        </Container>

        {/* Footer remains the same */}
        <footer className="py-4" style={{ backgroundColor: '#45974e', color: 'white' }}>
          <Container>
            <Row>
              <Col md={4} className="mb-3 mb-md-0">
                <h5>MoneyStreet</h5>
                <p>Your trusted partner in financial growth and security.</p>
              </Col>
              <Col md={4} className="mb-3 mb-md-0">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                  <li><Link to="/" className="text-white">Home</Link></li>
                  <li><Link to="/services" className="text-white">Services</Link></li>
                  <li><Link to="/about" className="text-white">About Us</Link></li>
                  <li><Link to="/contact" className="text-white">Contact</Link></li>
                </ul>
              </Col>
              <Col md={4}>
                <h5>Contact Us</h5>
                <address>
                  <p>123 Finance Ave<br />Moneyville, MV 12345</p>
                  <p>Email: info@moneystreet.com<br />Phone: (123) 456-7890</p>
                </address>
              </Col>
            </Row>
            <hr className="my-3 bg-light" />
            <p className="text-center mb-0">&copy; {new Date().getFullYear()} MoneyStreet. All rights reserved.</p>
          </Container>
        </footer>
      </div>
   
  );
};

export default Hero;