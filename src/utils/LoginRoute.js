import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const LoginRoute = ({ path, component }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const isLoged = localStorage.getItem('hcmaid');
  const role = localStorage.getItem('hcmaid');

  console.log(isLoged, role);
  if (isLoged && role === 'student') {
    return <Redirect to="/attendence" />;
  }

  if (isLoged && (role === 'teacher' || role === 'admin')) {
    return <Redirect to="/admin/studentManagement" />;
  }
  return <Route path={path} component={component} />;
};

export default LoginRoute;
