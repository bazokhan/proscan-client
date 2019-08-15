import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { Link } from 'react-router-dom';
import Main from 'layout/Main';
// import SessionContext from 'context/SessionContext';
import { CircularProgress } from 'layout/material-ui/core';
// import { CreateIcon } from 'layout/material-ui/icons';
// import Section from 'layout/Section';
import SessionForm from './components/SessionForm';
import sessionByIDGql from '../gql/sessionByID.gql';

const Edit = ({ match }) => {
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
      <h1 className="h1">Edit Session</h1>
      <form className="form">
        <Link to={`/sessions/${session.publicId}`} className="link-full">
          <button type="button" className="button">
            Return To Session Details
          </button>
        </Link>
      </form>
      <SessionForm session={session} />
    </Main>
  );
};

Edit.propTypes = {
  match: PropTypes.object.isRequired
};

export default Edit;
