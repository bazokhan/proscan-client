import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import Main from 'layout/Main';
import Section from 'layout/Section';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import tokenGql from 'app/gql/token.gql';
import ErrorMessage from 'components/SessionForm/ErrorMessage';
import AuthContext from 'context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import loginGql from './gql/login.gql';

const Login = () => {
  const { client, isLoading, authToken, setAuthToken } = useContext(
    AuthContext
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const loginMutation = useMutation(loginGql);

  const handleLoginSubmit = e => {
    e.preventDefault();
    loginMutation({
      variables: { email, password },
      update: (_, { data: { login } }) => {
        client.writeQuery({
          query: tokenGql,
          data: {
            token: { ...login, id: 'auth_token' }
          }
        });
        setError(null);
        setAuthToken(login.token);
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
      <Section>
        <form onSubmit={handleLoginSubmit}>
          <TextField
            label="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
        {error && <ErrorMessage error={error} />}
      </Section>
    </Main>
  );
};

export default Login;
