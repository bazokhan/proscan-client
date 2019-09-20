import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Main from 'layout/Main';
import AuthContext from 'context/AuthContext';

const Login = ({ history }) => {
  const { isLoading, logout, isLogoutLoading } = useContext(AuthContext);

  const logoutUser = async () => {
    try {
      await logout();
      if (!isLogoutLoading) {
        history.push('/');
      }
    } catch (e) {
      console.log(e);
      if (!isLogoutLoading) {
        history.push('/');
      }
    }
  };

  logoutUser();

  if (isLoading) return null;

  return (
    <Main>
      <div>Bye..</div>
    </Main>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired
};

export default Login;
