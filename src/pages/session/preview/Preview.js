import React from 'react';
import Choice from 'components/Choice';
import Question from 'components/Question';
import Main from 'layout/Main';
import { useSession } from 'hooks/useSession';
import { Link, RouterLink, CircularProgress } from 'layout/material-ui/core';

const Preview = ({ match }) => {
  const [session] = useSession(match.params.sessionId);

  if (!session)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );

  return (
    <Main>
      <div>Sessions ID: {session.id}</div>
      <div>{session.name}</div>
      {session.questions.map((question, questionIndex) => (
        <Question
          label={`Question ${questionIndex + 1} : `}
          key={question.id}
          question={question}
        >
          {question.choices.map((choice, choiceIndex) => (
            <Choice
              label={`${choiceIndex + 1} - `}
              key={choice.id}
              choice={choice}
            />
          ))}
        </Question>
      ))}
      <Link to={`/sessions/${session.id}/edit`} component={RouterLink}>
        Edit This Session
      </Link>
      <Link to={`/sessions/${session.id}/start`} component={RouterLink}>
        Start This Session
      </Link>
      <Link to="/sessions" component={RouterLink}>
        Back To My Sessions
      </Link>
    </Main>
  );
};
export default Preview;
