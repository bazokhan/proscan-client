import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Main from 'layout/Main';
import { CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import useSession from 'hooks/useSession';
import Question from '../components/Question';
import Choice from '../components/Choice';

const Details = ({ match }) => {
  const { publicId, questions, error, loading } = useSession(
    match.params.sessionId
  );

  if (error) {
    toast.error(error.message.replace('GraphQL error: ', ''));
    return (
      <Main>
        <div className="toast-error">
          Error: {error.message.replace('GraphQL error: ', '')}
        </div>
      </Main>
    );
  }

  if (loading)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );

  return (
    <Main>
      <div className="container">
        <h1 className="h1">Session ID: {publicId}</h1>
        <div className="toast-info">
          This session has {questions ? questions.length : 'no'} questions
        </div>
        <div className="card-row">
          <Link to={`/sessions/${publicId}/edit`} className="link">
            <button className="button-small" type="button">
              Edit
            </button>
          </Link>
          <Link to={`/sessions/${publicId}/preview`} className="link">
            <button
              className="button-small"
              type="button"
              disabled={!questions || !questions.length}
            >
              Preview
            </button>
          </Link>
          <Link to={`/sessions/${publicId}/start`} className="link">
            <button
              className="button-small"
              type="button"
              disabled={!questions || !questions.length}
            >
              Start &nbsp; &gt;
            </button>
          </Link>
        </div>
        {questions.map(question => (
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
