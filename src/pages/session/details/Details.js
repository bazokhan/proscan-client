import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { Link } from 'react-router-dom';
import Main from 'layout/Main';
import { CircularProgress } from '@material-ui/core';
import Question from '../components/Question';
import Choice from '../components/Choice';
import sessionByIDGql from '../gql/sessionByID.gql';

const Details = ({ match }) => {
  const { data } = useQuery(sessionByIDGql, {
    variables: { publicId: match.params.sessionId }
  });
  const { sessionByID: session, error, loading } = data;
  if (error)
    return (
      <Main>
        <div className="toast-error">Error: {error.message}</div>
      </Main>
    );
  if (loading)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  if (!session)
    return (
      <Main>
        <div className="toast-error">
          Session Could not be loaded, please try again!
        </div>
      </Main>
    );

  return (
    <Main>
      <div className="container">
        <h1 className="h1">Session ID: {session.publicId}</h1>
        <div className="toast-info">
          This session has {session.questions ? session.questions.length : 'no'}{' '}
          questions
        </div>
        <div className="card-row">
          <Link to={`/sessions/${session.publicId}/edit`} className="link">
            <button className="button-small" type="button">
              Edit
            </button>
          </Link>
          <Link to={`/sessions/${session.publicId}/preview`} className="link">
            <button
              className="button-small"
              type="button"
              disabled={!session.questions || !session.questions.length}
            >
              Preview
            </button>
          </Link>
          <Link to={`/sessions/${session.publicId}/start`} className="link">
            <button
              className="button-small"
              type="button"
              disabled={!session.questions || !session.questions.length}
            >
              Start &nbsp; &gt;
            </button>
          </Link>
        </div>
        {session.questions.map(question => (
          <div className="card" key={question.id}>
            <Question question={question}>
              {question.choices.map(choice => (
                <Choice key={choice.id} choice={choice} />
              ))}
            </Question>
          </div>
        ))}
      </div>
    </Main>
  );
};

Details.propTypes = {
  match: PropTypes.object.isRequired
};

export default Details;
