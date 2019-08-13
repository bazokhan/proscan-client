import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Main from 'layout/Main';
import {
  TextField,
  Button,
  CircularProgress,
  Typography
} from 'layout/material-ui/core';
import Section from 'layout/Section';
import RouteButton from 'layout/RouteButton';
import useStyles from 'app/Theme';
import sessionByIDGql from './gql/joinSession.gql';

const Join = () => {
  const classes = useStyles();
  const [session, setSession] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [joinSessionMutation] = useMutation(sessionByIDGql, {
    variables: { publicId, username: 'Guest' },
    onCompleted: ({ joinSession }) => {
      setSession(joinSession.session);
      setLoading(false);
    }
  });

  const handleChange = e => {
    setPublicId(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    joinSessionMutation();
  };

  return (
    <Main>
      {session && <Redirect to={`/${session.publicId}`} />}
      <Section>
        <Typography component="h1" variant="h6">
          Join A Session
        </Typography>
      </Section>
      {isLoading ? (
        <Section>
          <CircularProgress />
        </Section>
      ) : (
        <Section>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              fullWidth
              variant="outlined"
              size="large"
              margin="normal"
              required
              label="Enter Session ID"
              value={publicId || ''}
              onChange={handleChange}
            />
            {!isLoading && !session && (
              <Typography variant="subtitle1" color="error">
                Could Not Find This Session
              </Typography>
            )}
            <Button
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={isLoading}
            >
              Join
            </Button>
            <RouteButton to="/" size="large">
              Home
            </RouteButton>
          </form>
        </Section>
      )}
    </Main>
  );
};
export default Join;
