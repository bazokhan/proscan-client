import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Main from 'layout/Main';
import { CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import useSession from 'hooks/useSession';
import { FaEdit, FaPlay } from 'react-icons/fa';
import Question from '../components/Question';
import styles from './Details.module.scss';

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
        <div className={styles.actionButtons}>
          <Link to={`/sessions/${publicId}/edit`}>
            <button type="button">
              <FaEdit /> Edit
            </button>
          </Link>
          <Link to={`/sessions/${publicId}/preview`}>
            <button type="button" disabled={!questions || !questions.length}>
              Preview
            </button>
          </Link>
          <Link to={`/sessions/${publicId}/start`}>
            <button type="button" disabled={!questions || !questions.length}>
              Start <FaPlay />
            </button>
          </Link>
        </div>
        {questions.map(question => (
          <div className="card" key={question.id}>
            <Question question={question} />
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
