import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Main from 'layout/Main';
import { CircularProgress } from '@material-ui/core';
import useSession from 'hooks/useSession';
import { toast } from 'react-toastify';
import Question from '../components/Question';
import Choice from '../components/Choice';

const Preview = ({ match }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const { publicId, questions, error, loading } = useSession(
    match.params.sessionId
  );

  const next = () =>
    setCurrentIndex(Math.min(currentIndex + 1, questions.length - 1));

  const prev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));

  useEffect(() => {
    if (questions && questions[currentIndex]) {
      setCurrentQuestion(questions[currentIndex]);
    }
  }, [questions, currentIndex]);

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
        <h1 className="h1">Preview Session: {publicId}</h1>
        {currentQuestion && (
          <div className="card">
            <div className="card-row">
              <button type="button" className="button-fab" onClick={prev}>
                -
              </button>
              <button type="button" className="button-fab" onClick={next}>
                +
              </button>
            </div>
            <Question question={currentQuestion}>
              {currentQuestion.choices.map(choice => (
                <Choice key={choice.id} choice={choice} />
              ))}
            </Question>
          </div>
        )}
        <div className="card-row">
          <Link to="/sessions" className="link-outlined">
            &lt; &nbsp; Back To My Sessions
          </Link>
          <Link to={`/sessions/${publicId}/edit`} className="link-outlined">
            Edit This Session
          </Link>
          <Link to={`/sessions/${publicId}/start`} className="link-outlined">
            Start This Session &nbsp; &gt;
          </Link>
        </div>
      </div>
    </Main>
  );
};

Preview.propTypes = {
  match: PropTypes.object.isRequired
};

export default Preview;
