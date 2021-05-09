import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const StudentRoute = ({ path, component }) => {
  const isLoged = Cookies.get('hcmaid');
  const role = Cookies.get('role');
  if (isLoged && role === 'student') {
    return <Route path={path} component={component} />;
  }
  return <Redirect to="/" />;
};

export default StudentRoute;
