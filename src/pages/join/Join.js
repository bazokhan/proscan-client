import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from 'react-apollo';
import Main from 'layout/Main';
import { TextField, Button, Typography } from '@material-ui/core';
import RouteButton from 'layout/RouteButton';
import useStyles from 'app/Theme';
import joinSessionGql from './gql/joinSession.gql';
import activeSessionsGql from './gql/activeSessions.gql';

const Join = ({ history }) => {
  const classes = useStyles();

  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [username, setUsername] = useState('');

  useQuery(activeSessionsGql, {
    onCompleted: ({ activeSessions }) => setSessions(activeSessions)
  });

  const handleSearch = () => {
    const requiredSession = sessions.find(s => s.publicId === publicId);
    setSession(requiredSession);
  };

  const [joinSessionMutation] = useMutation(joinSessionGql, {
    variables: { publicId, username },
    onCompleted: ({ joinSession }) => {
      const { publicId: sessionId } = joinSession.session;
      history.push(`/${sessionId}`);
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    joinSessionMutation();
  };

  const handleNameChange = e => {
    setUsername(e.target.value);
  };

  return (
    <Main>
      <Typography component="h1" variant="h6">
        Join A Session
      </Typography>

      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          fullWidth
          variant="outlined"
          size="large"
          margin="normal"
          required
          label="Enter Session ID"
          value={publicId || ''}
          onChange={e => setPublicId(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
        {session && (
          <div>
            <div>{session.publicId}</div>
            <div>{session.author.username}</div>
            <label htmlFor="username">
              Username
              <input
                name="username"
                type="text"
                placeholder="username"
                onChange={handleNameChange}
              />
            </label>
            <Button
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={!session || !publicId || !username}
            >
              Join
            </Button>
          </div>
        )}
      </form>
      <RouteButton to="/" size="large">
        Home
      </RouteButton>
    </Main>
  );
};

Join.propTypes = {
  history: PropTypes.object.isRequired
};

export default Join;
