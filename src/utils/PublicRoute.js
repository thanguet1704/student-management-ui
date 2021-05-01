import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, props, ...rest }) => {
  return (
    <Route>
      {...rest}
      render={(props) => {}}
    </Route>
  );
};

export default PublicRoute;
