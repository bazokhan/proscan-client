import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import Main from 'layout/Main';
import Section from 'layout/Section';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
        console.log({ data });
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
      <Section>
        <form onSubmit={handleSignupSubmit}>
          <TextField
            label="username"
            type="username"
            required
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
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
          <Button type="submit">Signup</Button>
        </form>
        {error && <ErrorMessage error={error} />}
      </Section>
    </Main>
  );
};

export default Signup;
