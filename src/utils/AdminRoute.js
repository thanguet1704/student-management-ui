import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Cookies from 'js-cookie';

const AdminRoute = ({ path, component }) => {
  const { auth } = useContext(AuthContext);
  const isLoged = Cookies.get('hcmaid');
  const role = auth.role;
  if (isLoged && role !== 'student') {
    return <Route path={path} component={component} />;
  }
  return <Redirect to="/" />;
};

export default AdminRoute;
