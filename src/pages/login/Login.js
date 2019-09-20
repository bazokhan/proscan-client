import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';
import Main from 'layout/Main';
import AuthContext from 'context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import loginGql from './gql/login.gql';

const Login = ({ history }) => {
  const { isLoading, authToken, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginMutation] = useMutation(loginGql);

  const handleLoginSubmit = async e => {
    e.preventDefault();
    try {
      setLoginLoading(true);
      await loginMutation({
        variables: { email, password },
        update: (_, { data }) => {
          toast.success('Login Successful');
          setError(null);
          setLoginLoading(false);
          login(data.login);
        }
      });
    } catch (err) {
      toast.error(err.message.replace('GraphQL error: ', ''));
      setLoginLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      history.push('/');
    }
  }, [authToken, history]);

  if (isLoading) {
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  }

  return (
    <Main>
      <h1 className="h1">Login</h1>
      <form className="form main" onSubmit={handleLoginSubmit}>
        <label className="label" htmlFor="email">
          <span>Email</span>
          <input
            className="input"
            placeholder="email"
            id="email"
            name="email"
            type="email"
            required
            value={email}
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label className="label" htmlFor="password">
          <span>Password</span>
          <input
            className="input"
            placeholder="password"
            id="password"
            name="password"
            type="password"
            required
            value={password}
            autoComplete="password"
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button className="button" type="submit" disabled={loginLoading}>
          {loginLoading ? <CircularProgress /> : 'Login'}
        </button>
        {error && (
          <div className="toast-error">
            {error.message.replace('GraphQL error: ', '')}
          </div>
        )}
      </form>
    </Main>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired
};

export default Login;
