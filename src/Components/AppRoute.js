import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from '../Context';

const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();

  console.log('AppRoute, userDetails: ' + JSON.stringify(userDetails));

  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !Boolean(userDetails.token) ? (
          <Redirect to={{ pathname: '/login' }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default AppRoute;
