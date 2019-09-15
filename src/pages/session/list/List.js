import React from 'react';
import { Link } from 'react-router-dom';
import Main from 'layout/Main';
import { CircularProgress } from '@material-ui/core';
import { useQuery } from 'react-apollo';
import userSessionsGql from './gql/userSessions.gql';
import styles from './List.module.scss';

const List = () => {
  const { data, loading, error } = useQuery(userSessionsGql, {
    fetchPolicy: 'cache-and-network'
  });

  if (error) {
    return (
      <Main>
        <div className="toast-error">Error, {error.message}</div>
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

  const { userSessions } = data;

  return (
    <Main>
      <div className="container">
        <Link to="/sessions/create" className="link-full">
          <button type="button" className="button">
            Create New Session
          </button>
        </Link>
        <h1 className="h1">My Sessions</h1>

        {userSessions && userSessions.length ? (
          userSessions.map(session => (
            <Link
              to={`/sessions/${session.publicId}`}
              key={session.publicId}
              className="link"
            >
              <div className="card-hover" key={session.publicId}>
                <div className="card-row">
                  <div className={styles.sessionName}>
                    Session ID: {session.publicId}
                  </div>
                  <div className={session.status}>Status: {session.status}</div>
                </div>
                <div className="toast">
                  No. of questions:{' '}
                  {session.questions ? session.questions.length : 'unknown'}
                </div>
                <div className="toast">
                  Author: {session.author ? session.author.username : 'unknown'}
                </div>
                <div className="toast">
                  Active Question: {session.activeQuestion || 'None'}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="toast-error">You have no sessions yet</div>
        )}
      </div>
    </Main>
  );
};
export default List;
