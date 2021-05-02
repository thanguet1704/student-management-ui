import { Route } from 'react-router-dom';

const PublicRoute = ({ path, component }) => {
  return <Route path={path} component={component} />;
};

export default PublicRoute;
