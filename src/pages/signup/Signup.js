import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import Main from 'layout/Main';
import ErrorMessage from 'components/SessionForm/ErrorMessage';
import AuthContext from 'context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import signupGql from './gql/signup.gql';
import styles from './Signup.module.scss';

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
      <form className={styles.form} onSubmit={handleSignupSubmit}>
        <label className={styles.label} htmlFor="username">
          <span>Username</span>
          <input
            className={styles.input}
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

        <label className={styles.label} htmlFor="username">
          <span>Email</span>
          <input
            className={styles.input}
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

        <label className={styles.label} htmlFor="username">
          <span>Password</span>
          <input
            className={styles.input}
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

        <button className={styles.button} type="submit">
          Signup
        </button>
      </form>
      {error && <ErrorMessage error={error} />}
    </Main>
  );
};

export default Signup;
