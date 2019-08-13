import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Main from 'layout/Main';
import { Link, CircularProgress } from '@material-ui/core';
import { useQuery } from 'react-apollo';
import Question from '../components/Question';
import Choice from '../components/Choice';
import sessionByIDGql from '../gql/sessionByID.gql';

const Preview = ({ match }) => {
  const { data } = useQuery(sessionByIDGql, {
    variables: { publicId: match.params.sessionId }
  });
  const { sessionByID: session, error, loading } = data;
  if (error) return <div>Error</div>;
  if (loading)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );

  return (
    <Main>
      <div>Sessions ID: {session.publicId}</div>
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
      <Link to={`/sessions/${session.publicId}/edit`} component={RouterLink}>
        Edit This Session
      </Link>
      <Link to={`/sessions/${session.publicId}/start`} component={RouterLink}>
        Start This Session
      </Link>
      <Link to="/sessions" component={RouterLink}>
        Back To My Sessions
      </Link>
    </Main>
  );
};

Preview.propTypes = {
  match: PropTypes.object.isRequired
};

export default Preview;
