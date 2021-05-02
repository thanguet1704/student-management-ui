import { Redirect, Route } from 'react-router-dom';

const LoginRoute = ({ path, component }) => {
  const isLoged = localStorage.getItem('hcmaid');
  const role = localStorage.getItem('role');

  if (isLoged && role === 'student') {
    return <Redirect to="/attendence" />;
  }

  if (isLoged && (role === 'teacher' || role === 'admin')) {
    return <Redirect to="/admin/studentManagement" />;
  }
  return <Route path={path} component={component} />;
};

export default LoginRoute;
