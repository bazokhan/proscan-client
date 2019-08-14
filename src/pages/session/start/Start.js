import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Main from 'layout/Main';
import { Link, CircularProgress, Button } from '@material-ui/core';
import { useQuery, useMutation } from 'react-apollo';
import Question from '../components/Question';
import Choice from '../components/Choice';
import sessionByIDGql from '../gql/sessionByID.gql';
import changeStatusGql from './gql/changeStatus.gql';

const Start = ({ match }) => {
  const [question, setQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  const { data } = useQuery(sessionByIDGql, {
    variables: { publicId: match.params.sessionId }
  });
  const { sessionByID: session, error, loading } = data;

  const [changeStatusMutation] = useMutation(changeStatusGql);
  const pauseSession = () =>
    changeStatusMutation({
      variables: { publicId: match.params.sessionId, status: 'PAUSED' }
    });
  const endSession = () =>
    changeStatusMutation({
      variables: { publicId: match.params.sessionId, status: 'ENDED' }
    });
  const startSession = () =>
    changeStatusMutation({
      variables: { publicId: match.params.sessionId, status: 'ACTIVE' }
    });

  useEffect(() => {
    if (session && session.activeQuestion) {
      const activeQuestion = session.questions.find(
        q => q.id === session.activeQuestion
      );
      setQuestionIndex(session.questions.indexOf(activeQuestion));
    } else {
      setQuestionIndex(0);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      setQuestion(session.questions[questionIndex]);
    }
  }, [session, questionIndex]);

  if (error) return <div>Error</div>;
  if (loading)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  if (!session)
    return <div>Session Could not be loaded, please try again!</div>;

  const handleNavClick = value => {
    const newIndex = questionIndex + value;
    if (newIndex <= session.questions.length - 1 && newIndex >= 0) {
      setQuestionIndex(newIndex);
    }
  };

  if (!question)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );

  return (
    <Main>
      <div>Sessions ID: {session.publicId}</div>
      <div>{session.name}</div>
      <div>{session.status}</div>
      {session.status === 'ACTIVE' && (
        <>
          <Question
            label={`Question ${questionIndex + 1} : `}
            key={question.id}
            question={question}
          >
            <Button onClick={() => handleNavClick(-1)}>Previous</Button>
            <Button onClick={() => handleNavClick(1)}>Next</Button>
            {question.choices.map((choice, choiceIndex) => (
              <Choice
                label={`${choiceIndex + 1} - `}
                key={choice.id}
                choice={choice}
              />
            ))}
          </Question>
          <button type="button" onClick={pauseSession}>
            Pause
          </button>
          <button type="button" onClick={endSession}>
            Stop
          </button>
        </>
      )}
      {session.status === 'PAUSED' && (
        <>
          <button type="button" onClick={startSession}>
            Resume
          </button>
          <button type="button" onClick={endSession}>
            Stop
          </button>
        </>
      )}
      {session.status === 'ENDED' && (
        <button type="button" onClick={startSession}>
          Start
        </button>
      )}
      {session.status === 'PENDING' && (
        <button type="button" onClick={startSession}>
          Start
        </button>
      )}

      <Link to={`/sessions/${session.publicId}`} component={RouterLink}>
        Return to session overview
      </Link>
    </Main>
  );
};

Start.propTypes = {
  match: PropTypes.object.isRequired
};

export default Start;
