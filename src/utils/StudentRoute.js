import { Redirect, Route } from 'react-router-dom';

const StudentRoute = ({ path, component }) => {
  const isLoged = localStorage.getItem('hcmaid');
  const role = localStorage.getItem('role');
  if (isLoged && role === 'student') {
    return <Route path={path} component={component} />;
  }
  return <Redirect to="/" />;
};

export default StudentRoute;
