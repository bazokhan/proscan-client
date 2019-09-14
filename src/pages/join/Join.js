import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from 'react-apollo';
import Main from 'layout/Main';
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';
import joinSessionGql from './gql/joinSession.gql';
import activeSessionsGql from './gql/activeSessions.gql';

const Join = ({ history }) => {
  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [username, setUsername] = useState('');
  const [notFound, setNotFound] = useState(false);

  const { data, error, loading } = useQuery(activeSessionsGql);

  useEffect(() => {
    if (data && data.activeSessions) {
      setSessions(data.activeSessions);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message.replace('GraphQL error: ', ''));
    }
  }, [error]);

  const handleSearch = () => {
    const requiredSession = sessions.find(s => s.publicId === publicId);
    if (!requiredSession) {
      toast.error('Session not found, please try again.');
      setNotFound(true);
      return;
    }
    setSession(requiredSession);
    toast.success('Session found.');
    setNotFound(false);
  };

  const [joinSessionMutation] = useMutation(joinSessionGql);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await joinSessionMutation({
        variables: { publicId, username },
        update: (_, { data: joinData }) => {
          toast.info('Joining...');
          const { publicId: sessionId } = joinData.joinSession.session;
          history.push(`/${sessionId}`);
        }
      });
    } catch (err) {
      toast.error(err.message.replace('GraphQL error: ', ''));
    }
  };

  return (
    <Main>
      <h1 className="h1">Join A Session</h1>
      <form onSubmit={handleSubmit} className="form">
        {!session && (
          <>
            <label className="label" htmlFor="sessionId">
              <span>Search for an active session..</span>
              <input
                name="sessionId"
                type="text"
                className="input"
                placeholder="Session ID"
                value={publicId || ''}
                onChange={e => setPublicId(e.target.value)}
              />
            </label>
            <button
              type="button"
              className="button"
              onClick={handleSearch}
              disabled={loading || error}
            >
              {loading ? <CircularProgress /> : 'Search'}
            </button>
            {notFound && (
              <div className="toast-error">Session Not Found.. Try Again!</div>
            )}
          </>
        )}
        {session && (
          <>
            <div className="card">
              <div className="toast-success">Session Found ...</div>
              <div className="card-row">Session ID: {session.publicId}</div>
              <div className="card-row">
                Author:{' '}
                {session.author ? session.author.username : 'Unknown Author'}
              </div>
            </div>
            <label className="label" htmlFor="username">
              <span>Enter a username to join..</span>
              <input
                name="username"
                type="text"
                className="input"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </label>
            <button
              className="button"
              type="submit"
              disabled={!session || !publicId || !username}
            >
              Join
            </button>
            <button
              className="button"
              type="button"
              onClick={() => {
                setSession(null);
                setPublicId('');
              }}
            >
              Search Again
            </button>
          </>
        )}
      </form>
    </Main>
  );
};

Join.propTypes = {
  history: PropTypes.object.isRequired
};

export default Join;
