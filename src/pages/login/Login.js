import React, { useState } from 'react';
import Main from 'layout/Main';
import Section from 'layout/Section';
import TextField from '@material-ui/core/TextField';
import { useMutation } from 'react-apollo-hooks';
import Button from '@material-ui/core/Button';
import loginGql from './gql/login.gql';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useMutation(loginGql);

  const handleLoginSubmit = e => {
    e.preventDefault();
    login({ variables: { email, password } })
      .then(console.log)
      .catch(console.log);
  };

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
      </Section>
    </Main>
  );
};

export default Login;
