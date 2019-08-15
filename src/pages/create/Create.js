import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import Main from 'layout/Main';
import createSessionGql from './gql/createSession.gql';

const Create = ({ history }) => {
  const [publicId, setPublicId] = useState('');
  const [sessionError, setSessionError] = useState(null);

  const [createSessionMutation] = useMutation(createSessionGql, {
    variables: { publicId },
    onError: e => {
      setSessionError(e.message);
    },
    onCompleted: () => {
      if (sessionError) {
        return;
      }
      history.push(`/sessions/${publicId}/edit`);
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    createSessionMutation();
  };

  const handlePublicIdChange = e => {
    setSessionError(null);
    setPublicId(e.target.value);
  };

  return (
    <Main>
      <h1 className="h1">Create A New Session</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="publicId" className="label">
          <span>Public ID</span>
          <input
            name="publicId"
            type="text"
            className="input"
            placeholder="Public ID"
            onChange={handlePublicIdChange}
          />
        </label>
        <button
          type="submit"
          className="button"
          disabled={!publicId || sessionError}
        >
          Save Session
        </button>
        {sessionError && <div className="toast-error">{sessionError}</div>}
      </form>
    </Main>
  );
};

Create.propTypes = {
  history: PropTypes.object.isRequired
};

export default Create;
