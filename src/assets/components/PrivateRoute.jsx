import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  
  if (!user) {
    // Redirect to login if there's no user
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
