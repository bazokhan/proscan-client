import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Main from 'layout/Main';
import { useQuery } from 'react-apollo';
import AuthContext from 'context/AuthContext';
import profileGql from './gql/profile.gql';

const Home = () => {
  const { authToken } = useContext(AuthContext);
  const { data, loading, error } = useQuery(profileGql);

  if (!authToken) {
    return (
      <Main>
        <div className="container">
          <h1 className="h1">Welcome, Guest..</h1>
          <Link to="/join" className="link">
            <div className="card-hover">
              <div className="card-row">
                <h2>Join Session</h2>
              </div>
            </div>
          </Link>
        </div>
      </Main>
    );
  }

  if (error) {
    return <div className="toast-info">Error, {error.message}</div>;
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
        <div>Error Please Refresh !!!</div>
      </Main>
    );
  const { profile } = data;

  return (
    <Main>
      <div className="container">
        <h1 className="h1">{`Welcome, ${
          profile ? profile.username : 'Guest'
        }`}</h1>
        {profile && (
          <div className="toast-info">
            You currently have{' '}
            {profile.sessions ? profile.sessions.length : 'No'} sessions
          </div>
        )}
        {profile ? (
          <Link to="/sessions" className="link">
            <div className="card-hover">
              <div className="card-row">
                <h2>My Sessions</h2>
              </div>
              <div className="card-row">
                <p>Create, Edit, Preview and Start my sessions</p>
              </div>
            </div>
          </Link>
        ) : null}
        <Link to="/join" className="link">
          <div className="card-hover">
            <div className="card-row">
              <h2>Join Session</h2>
            </div>
          </div>
        </Link>
      </div>
    </Main>
  );
};
export default Home;
