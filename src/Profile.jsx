import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner, Card, Modal,Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get('/api/user/profile', { withCredentials: true });
        setUserData(prev => ({
          ...prev,
          username: response.data.username,
          email: response.data.email
        }));
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (section) => {
    const newErrors = {};

    if (section === 'account' || section === 'all') {
      if (!userData.username) newErrors.username = 'Username is required';
      if (!userData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        newErrors.email = 'Invalid email address';
      }
    }

    if (section === 'password' || section === 'all') {
      if (!userData.currentPassword) newErrors.currentPassword = 'Current password is required';
      if (!userData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (userData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
      if (userData.newPassword !== userData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm('account')) return;

    try {
      setLoading(true);
      setSuccess('');
      
      // Replace with your actual API endpoint
      await axios.put('/api/user/profile', {
        username: userData.username,
        email: userData.email
      }, { withCredentials: true });

      setSuccess('Account information updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      setErrors(prev => ({
        ...prev,
        apiError: err.response?.data?.message || 'Failed to update profile'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm('password')) return;

    try {
      setLoading(true);
      setSuccess('');
      
      // Replace with your actual API endpoint
      await axios.put('/api/user/password', {
        currentPassword: userData.currentPassword,
        newPassword: userData.newPassword
      }, { withCredentials: true });

      setSuccess('Password updated successfully!');
      // Clear password fields
      setUserData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      console.error('Password update failed:', err);
      setErrors(prev => ({
        ...prev,
        apiError: err.response?.data?.message || 'Failed to update password'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      setErrors(prev => ({ ...prev, deleteError: 'Please type DELETE to confirm' }));
      return;
    }

    try {
      setLoading(true);
      
      // Replace with your actual API endpoint
      await axios.delete('/api/user', { withCredentials: true });
      
      // Redirect after successful deletion
      navigate('/');
    } catch (err) {
      console.error('Account deletion failed:', err);
      setErrors(prev => ({
        ...prev,
        deleteError: err.response?.data?.message || 'Failed to delete account'
      }));
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="mb-4" style={{ color: '#45974e' }}>Profile Settings</h2>
              
              {errors.apiError && <Alert variant="danger">{errors.apiError}</Alert>}
              {success && (
                <Alert variant="success" style={{ backgroundColor: '#45974e', color: 'white' }}>
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleAccountUpdate}>
                <h5 className="mb-3" style={{ color: '#45974e' }}>Account Information</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                      backgroundColor: '#45974e', 
                      borderColor: '#45974e',
                      minWidth: '120px'
                    }}
                  >
                    {loading ? (
                      <Spinner as="span" size="sm" animation="border" />
                    ) : (
                      'Update Profile'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <Form onSubmit={handlePasswordUpdate}>
                <h5 className="mb-3" style={{ color: '#45974e' }}>Change Password</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={userData.currentPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.currentPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.currentPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={userData.newPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.newPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                      backgroundColor: '#45974e', 
                      borderColor: '#45974e',
                      minWidth: '120px'
                    }}
                  >
                    {loading ? (
                      <Spinner as="span" size="sm" animation="border" />
                    ) : (
                      'Change Password'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="mb-3" style={{ color: '#f44336' }}>Danger Zone</h5>
              <p className="text-muted mb-4">
                Deleting your account will permanently remove all your data. This action cannot be undone.
              </p>
              
              <Button 
                variant="outline-danger"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete My Account
              </Button>

              {errors.deleteError && (
                <Alert variant="danger" className="mt-3">
                  {errors.deleteError}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Delete Account Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#f44336' }}>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This will permanently delete your MoneyStreet account and all associated data.</p>
          <p>To confirm, please type <strong>DELETE</strong> in the box below:</p>
          
          <Form.Control
            type="text"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            placeholder="Type DELETE to confirm"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteAccount}
            disabled={loading || deleteConfirm !== 'DELETE'}
          >
            {loading ? (
              <Spinner as="span" size="sm" animation="border" />
            ) : (
              'Permanently Delete Account'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;