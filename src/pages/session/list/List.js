/* eslint-disable no-nested-ternary */
import React from 'react';
import cx from 'class-names';
import { Link } from 'react-router-dom';
import Main from 'layout/Main';
import { CircularProgress } from '@material-ui/core';
import { useQuery } from 'react-apollo';
import { FaPlus } from 'react-icons/fa';
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
      <h1 className="h1">Manage your sessions</h1>
      <Link to="/sessions/create" className={styles.fab}>
        <FaPlus /> Create New Session
      </Link>
      {userSessions && userSessions.length ? (
        userSessions.map(session => {
          const activeQuestion = session.questions
            ? session.questions.find(q => q.id === session.activeQuestion)
            : () => {};
          const activeQuestionIndex = session.questions
            ? session.questions.findIndex(q => q === activeQuestion)
            : -1;
          const indexString =
            activeQuestionIndex > -1
              ? activeQuestionIndex + 1 === 1
                ? '1st'
                : activeQuestionIndex + 1 === 2
                ? '2nd'
                : `${activeQuestionIndex + 1}th`
              : 'None';
          return (
            <Link
              to={`/sessions/${session.publicId}`}
              key={session.publicId}
              className="link"
            >
              <div className="card-hover" key={session.publicId}>
                <div className="card-row">
                  <div className={styles.sessionName}>{session.publicId}</div>
                  <div className={session.status}>{session.status}</div>
                </div>
                <div className="row">
                  <div className={cx(styles.button, 'accent1')}>
                    <span className="title center-text">
                      {session.questions ? session.questions.length : 'unknown'}
                    </span>
                    <span className="subtitle center-text">Questions</span>
                  </div>
                  {/* <div className={cx(styles.button, 'main subtitle')}>
                    Author:{' '}
                    {session.author ? session.author.username : 'unknown'}
                  </div> */}
                  <div className={cx(styles.button, 'main')}>
                    <span className="subtitle center-text">
                      Active Question
                    </span>
                    <span className="title center-text">{indexString}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="toast-error">You have no sessions yet</div>
      )}
    </Main>
  );
};
export default List;
