import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import Main from 'layout/Main';
import ErrorMessage from 'components/SessionForm/ErrorMessage';
import AuthContext from 'context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import signupGql from './gql/signup.gql';

const Signup = () => {
  const { isLoading, authToken, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [signupMutation] = useMutation(signupGql);

  const handleSignupSubmit = e => {
    e.preventDefault();
    signupMutation({
      variables: { data: { email, username, password } },
      update: (_, { data }) => {
        setError(null);
        login(data.signup);
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
      <h1 className="h1">Signup</h1>
      <form className="form" onSubmit={handleSignupSubmit}>
        <label className="label" htmlFor="username">
          <span>Username</span>
          <input
            className="input"
            placeholder="username"
            id="username"
            name="username"
            type="text"
            required
            value={username}
            autoComplete="username"
            onChange={e => setUsername(e.target.value)}
          />
        </label>

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
          Signup
        </button>
      </form>
      {error && <ErrorMessage error={error} />}
    </Main>
  );
};

export default Signup;
