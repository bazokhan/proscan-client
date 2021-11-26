import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from 'context/AuthContext';

const AuthRoute = props => {
  const { isLoading, authToken } = useContext(AuthContext);
  if (isLoading) return null;
  if (!authToken) return <Redirect to="/login" />;
  return <Route {...props} />;
};

export default AuthRoute;
