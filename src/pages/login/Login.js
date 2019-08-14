import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import Main from 'layout/Main';
import ErrorMessage from 'components/SessionForm/ErrorMessage';
import AuthContext from 'context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import loginGql from './gql/login.gql';

const Login = () => {
  const { isLoading, authToken, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loginMutation] = useMutation(loginGql);

  const handleLoginSubmit = e => {
    e.preventDefault();
    loginMutation({
      variables: { email, password },
      update: (_, { data }) => {
        setError(null);
        login(data.login);
      }
    }).catch(setError);
  };

  if (isLoading) {
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  }
  if (authToken) {
    return <Redirect exact to="/" />;
  }

  return (
    <Main>
      <h1 className="h1">Login</h1>
      <form className="form" onSubmit={handleLoginSubmit}>
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
        <button className="button" type="submit">
          Login
        </button>
      </form>
      {error && <ErrorMessage error={error} />}
    </Main>
  );
};

export default Login;
