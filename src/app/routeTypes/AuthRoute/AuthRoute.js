import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from 'context/AuthContext';

const AuthRoute = props => {
  const { isLoading, authToken } = useContext(AuthContext);
  const context = useContext(AuthContext);
  console.log({ location: 'AuthRoure', authToken });
  console.log({ context });
  if (isLoading) return null;
  if (!authToken) return <Redirect to="/login" />;
  return <Route {...props} />;
};

export default AuthRoute;
