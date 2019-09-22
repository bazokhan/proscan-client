import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Main from 'layout/Main';
import { CircularProgress, Button } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import useSession from 'hooks/useSession';
import { toast } from 'react-toastify';
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
        <div className={session.status}>{session.status}</div>
        <div className={session.status}>
          Participants: {(session.guests && session.guests.length) || 0}
        </div>
        {session.status === 'ACTIVE' && (
          <div className="card">
            <div className="card-row">
              <Button
                onClick={prevQuestionMutation}
                disabled={nextLoading || prevLoading}
              >
                Previous
              </Button>
              <Button
                onClick={nextQuestionMutation}
                disabled={nextLoading || prevLoading}
              >
                Next
              </Button>
            </div>
            {question && (
              <Question question={question} participants={session.guests} />
            )}
            <button type="button" className="button" onClick={pauseSession}>
              Pause
            </button>
            <button type="button" className="button" onClick={endSession}>
              Stop
            </button>
          </div>
        )}
        {session.status === 'PAUSED' && (
          <>
            <button type="button" className="button" onClick={startSession}>
              Resume
            </button>
            <button type="button" className="button" onClick={endSession}>
              Stop
            </button>
          </>
        )}
        {session.status === 'ENDED' && (
          <button type="button" className="button" onClick={startSession}>
            Start
          </button>
        )}
        {session.status === 'PENDING' && (
          <button type="button" className="button" onClick={startSession}>
            Start
          </button>
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
