import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const AdminRoute = ({ path, component }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const isLoged = localStorage.getItem('hcmaid');
  const role = auth.role;
  if (isLoged && role !== 'student') {
    return <Route path={path} component={component} />;
  }
  return <Redirect to="/" />;
};

export default AdminRoute;
