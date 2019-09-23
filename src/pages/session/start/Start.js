import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'class-names';
import { Link } from 'react-router-dom';
import Main from 'layout/Main';
import { CircularProgress } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import useSession from 'hooks/useSession';
import { toast } from 'react-toastify';
import { FaPlay, FaStop, FaPause, FaBackward, FaForward } from 'react-icons/fa';
import styles from './Start.module.scss';
import Question from './Question';
import changeStatusGql from './gql/changeStatus.gql';
import nextQuestionGql from './gql/nextQuestion.gql';
import prevQuestionGql from './gql/prevQuestion.gql';

// import subToSessionGql from './gql/subToSession.gql';

const Start = ({ match }) => {
  const [question, setQuestion] = useState(null);

  const { session, publicId, questions, error, loading } = useSession(
    match.params.sessionId
  );

  const [changeStatusMutation] = useMutation(changeStatusGql);
  const pauseSession = () =>
    changeStatusMutation({
      variables: { publicId, status: 'PAUSED' }
    });
  const endSession = () =>
    changeStatusMutation({
      variables: { publicId, status: 'ENDED' }
    });
  const startSession = () =>
    changeStatusMutation({
      variables: { publicId, status: 'ACTIVE' }
    });

  const [
    nextQuestionMutation,
    { data: nextData, loading: nextLoading, error: nextError }
  ] = useMutation(nextQuestionGql, { variables: { publicId } });

  const [
    prevQuestionMutation,
    { data: prevData, loading: prevLoading, error: prevError }
  ] = useMutation(prevQuestionGql, { variables: { publicId } });

  useEffect(() => {
    if (session && session.activeQuestion) {
      const activeQuestion = questions.find(
        ({ id }) => session.activeQuestion === id
      );
      setQuestion(activeQuestion);
    }
  }, [session]);

  useEffect(() => {
    if (
      nextData &&
      nextData.nextQuestion &&
      nextData.nextQuestion.activeQuestion
    ) {
      const activeQuestion = questions.find(
        ({ id }) => nextData.nextQuestion.activeQuestion === id
      );
      setQuestion(activeQuestion);
    }
  }, [nextData]);

  useEffect(() => {
    if (
      prevData &&
      prevData.prevQuestion &&
      prevData.prevQuestion.activeQuestion
    ) {
      const activeQuestion = questions.find(
        ({ id }) => prevData.prevQuestion.activeQuestion === id
      );
      setQuestion(activeQuestion);
    }
  }, [prevData]);

  if (error)
    return (
      <div className="toast-error">
        Error, {error.message.replace('GraphQL error: ', '')}
      </div>
    );

  if (nextError || prevError) {
    toast.error('Question could not be changed.. try again..');
  }

  const activeButtons = session && session.status === 'ACTIVE' && (
    <>
      <button type="button" className={styles.fab} onClick={pauseSession}>
        <FaPause />
      </button>
      <button type="button" className={styles.fab} onClick={endSession}>
        <FaStop />
      </button>
      <button
        type="button"
        className={styles.fab}
        onClick={prevQuestionMutation}
        disabled={nextLoading || prevLoading}
      >
        <FaBackward />
      </button>
      <button
        type="button"
        className={styles.fab}
        onClick={nextQuestionMutation}
        disabled={nextLoading || prevLoading}
      >
        <FaForward />
      </button>
    </>
  );

  const endedButtons = session && session.status === 'ENDED' && (
    <button type="button" className={styles.fab} onClick={startSession}>
      <FaPlay />
    </button>
  );

  const pendingButtons = session && session.status === 'PENDING' && (
    <button type="button" className={styles.fab} onClick={startSession}>
      <FaPlay />
    </button>
  );

  const pausedButtons = session && session.status === 'PAUSED' && (
    <>
      <button type="button" className={styles.fab} onClick={startSession}>
        <FaPlay />
      </button>
      <button type="button" className={styles.fab} onClick={endSession}>
        <FaStop />
      </button>
    </>
  );

  if (loading || !session)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );

  return (
    <Main>
      <div className="container">
        <h1 className="h1">Sessions ID: {session.publicId}</h1>
        <div className={styles.actionBar}>
          <div className={styles.status}>
            <div className={cx(session.status, styles.indicator)} />
            <p>
              Participants: {(session.guests && session.guests.length) || 0}
            </p>
          </div>
          {activeButtons}
          {pendingButtons}
          {pausedButtons}
          {endedButtons}
        </div>
        {session.status === 'ACTIVE' && (
          <div className="card">
            {question && (
              <Question question={question} participants={session.guests} />
            )}
          </div>
        )}
        <Link to={`/sessions/${session.publicId}`} className="link-outlined">
          Return to session overview
        </Link>
      </div>
    </Main>
  );
};

Start.propTypes = {
  match: PropTypes.object.isRequired
};

export default Start;
