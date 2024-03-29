import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';
import Main from 'layout/Main';
import AuthContext from 'context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import signupGql from './gql/signup.gql';

const Signup = ({ history }) => {
  const { isLoading, authToken, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signupMutation] = useMutation(signupGql);

  const handleSignupSubmit = async e => {
    e.preventDefault();
    try {
      setSignupLoading(true);
      await signupMutation({
        variables: { data: { email, username, password } },
        update: (_, { data }) => {
          toast.success('Signup Successful');
          setError(null);
          setSignupLoading(false);
          login(data.signup);
        }
      });
    } catch (err) {
      toast.error(err.message.replace('GraphQL error: ', ''));
      setSignupLoading(false);
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

        <button className="button" type="submit" disabled={signupLoading}>
          {signupLoading ? <CircularProgress /> : 'Singup'}
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

Signup.propTypes = {
  history: PropTypes.object.isRequired
};

export default Signup;
