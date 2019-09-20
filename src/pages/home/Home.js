import React, { useContext, useEffect } from 'react';
import cx from 'class-names';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Main from 'layout/Main';
import { useQuery } from 'react-apollo';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';
import { FaSearch, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import profileGql from './gql/profile.gql';
import styles from './Home.module.scss';

const Home = () => {
  const { authToken } = useContext(AuthContext);
  const { data, loading, error } = useQuery(profileGql, {
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message.replace('GraphQL error: ', ''));
    }
  }, [error]);

  if (!authToken) {
    return (
      <Main>
        <div className={styles.container}>
          <h1 className={cx(styles.title, styles.full)}>Welcome, Guest.. </h1>
          <Link
            to="/join"
            className={cx(styles.button, styles.full, styles.main)}
          >
            <FaSearch />
            <h2>Join a session</h2>
          </Link>
          <Link to="/login" className={cx(styles.button, styles.info)}>
            <FaSignInAlt />
            <h2>Login to your account</h2>
          </Link>
          <Link to="/signup" className={cx(styles.button, styles.accent1)}>
            <FaUserPlus />
            <h2>Create a new account</h2>
          </Link>
        </div>
      </Main>
    );
  }

  if (loading) {
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  }
  if (!data)
    return (
      <Main>
        <div className="toast-error">Error Please Refresh !!!</div>
      </Main>
    );
  const { profile } = data;

  return (
    <Main>
      <div className={styles.container}>
        {profile && (
          <div className="toast-info">
            You currently have{' '}
            {profile.sessions ? profile.sessions.length : 'No'} sessions
          </div>
        )}
        <h1 className={cx(styles.title, styles.full)}>{`Welcome, ${
          profile ? profile.username : 'Guest'
        }`}</h1>

        {profile ? (
          <Link
            to="/sessions"
            className={cx(styles.button, styles.full, styles.accent1)}
          >
            <h2>Manage your sessions</h2>
            <p>Create, Edit, Preview and Start sessions</p>
          </Link>
        ) : null}
        <Link
          to="/join"
          className={cx(styles.button, styles.full, styles.main)}
        >
          <FaSearch />
          <h2>Join Session</h2>
        </Link>
      </div>
    </Main>
  );
};
export default Home;
