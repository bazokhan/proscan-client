import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Main from 'layout/Main';
import {
  TextField,
  Button,
  CircularProgress,
  Typography
} from 'layout/material-ui/core';
import Section from 'layout/Section';
import ButtonGrid from 'layout/ButtonGrid';
import RouteButton from 'layout/RouteButton';
import { useSessions } from 'hooks/useSessions';
import { useStyles } from 'app/Theme';

const Join = () => {
  const classes = useStyles();
  const [sessions] = useSessions();
  const [timeoutFunction, setTimeoutFunction] = useState(null);
  const [session, setSession] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [requestsSent, setRequestsSent] = useState(0);

  const handleChange = e => {
    setPublicId(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeoutFunction(
      setTimeout(() => {
        setRequestsSent(requestsSent + 1);
        setSession(
          sessions.find(
            session => session.active && session.publicId === publicId
          )
        );
      }, 2000)
    );
  };

  useEffect(() => {
    setLoading(false);
  }, [requestsSent]);

  useEffect(
    () => () => {
      clearTimeout(timeoutFunction);
    },
    [timeoutFunction]
  );
  return (
    <Main>
      {session && <Redirect to={`/${session.id}`} />}
      <Section flex="column center">
        <Typography component="h1" variant="h6">
          Join A Session
        </Typography>
      </Section>
      {isLoading ? (
        <CircularProgress />
      ) : (
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
          {!isLoading && !session && !!requestsSent && (
            <Typography variant="subtitle1" color="error">
              Could Not Find This Session
            </Typography>
          )}
          <ButtonGrid spacing={2}>
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
          </ButtonGrid>
        </form>
      )}
    </Main>
  );
};
export default Join;
