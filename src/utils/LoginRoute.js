import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginRoute = ({ path, component }) => {
  const isLoged = Cookies.get('hcmaid');
  const role = Cookies.get('role');

  if (isLoged && role === 'student') {
    return <Redirect to="/attendence" />;
  }

  if (isLoged && (role === 'teacher' || role === 'admin')) {
    return <Redirect to="/admin/studentManagement" />;
  }
  return <Route path={path} component={component} />;
};

export default LoginRoute;
