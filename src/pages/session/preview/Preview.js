import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Main from 'layout/Main';
import { CircularProgress } from '@material-ui/core';
import { useQuery } from 'react-apollo';
import Question from '../components/Question';
import Choice from '../components/Choice';
import sessionByIDGql from '../gql/sessionByID.gql';

const Preview = ({ match }) => {
  const { data } = useQuery(sessionByIDGql, {
    variables: { publicId: match.params.sessionId },
    fetchPolicy: 'cache-and-network'
  });
  const { sessionByID: session, error, loading } = data;
  if (error) return <div>Error</div>;
  if (loading)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  if (!session)
    return <div>Session Could not be loaded, please try again!</div>;

  return (
    <Main>
      <div className="container">
        <h1 className="h1">Preview Session: {session.publicId}</h1>
        {session.questions.map(question => (
          <div className="card" key={question.id}>
            {' '}
            <Question question={question}>
              {question.choices.map(choice => (
                <Choice key={choice.id} choice={choice} />
              ))}
            </Question>
          </div>
        ))}
        <div className="card-row">
          <Link to="/sessions" className="link">
            <button className="button-small" type="button">
              &lt; &nbsp; Back To My Sessions
            </button>
          </Link>
          <Link to={`/sessions/${session.publicId}/edit`} className="link">
            <button className="button-small" type="button">
              Edit This Session
            </button>
          </Link>
          <Link to={`/sessions/${session.publicId}/start`} className="link">
            <button className="button-small" type="button">
              Start This Session &nbsp; &gt;
            </button>
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
