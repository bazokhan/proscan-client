import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import Main from 'layout/Main';
import { toast } from 'react-toastify';
import { FaPen } from 'react-icons/fa';
import createSessionGql from './gql/createSession.gql';

const Create = ({ history }) => {
  const [publicId, setPublicId] = useState('');
  const [sessionError, setSessionError] = useState('');

  const [createSessionMutation] = useMutation(createSessionGql);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!publicId) {
      setSessionError('You must provide an ID for your session!');
      return;
    }
    if (publicId.length < 4 || publicId.length > 6) {
      setSessionError('IDs must be between 4 and 6 characters');
      return;
    }
    try {
      await createSessionMutation({
        variables: { publicId },
        update: (_, { data }) => {
          toast.success('Session Created');
          setSessionError('');
          history.push(`/sessions/${data.createSession.publicId}/edit`);
        }
      });
    } catch (err) {
      toast.error(err.message.replace('GraphQL error: ', ''));
    }
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
          <div className="row jst-left">
            <FaPen className="row-item subtitle-dark" />
            <span className="row-item subtitle-dark">Public ID</span>
          </div>
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
