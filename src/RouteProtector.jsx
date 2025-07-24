
import { Navigate } from 'react-router-dom';

const RouteProtector = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RouteProtector;
