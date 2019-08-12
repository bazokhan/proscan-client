import React, { useState, useEffect } from 'react';
import useStyles from 'app/Theme';
import Main from 'layout/Main';
import Section from 'layout/Section';
import {
  Link,
  RouterLink,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Button,
  Avatar,
  Typography
} from 'layout/material-ui/core';
import { useQuery } from 'react-apollo';
import userSessionsGql from './gql/userSessions.gql';

const Sessions = () => {
  const classes = useStyles();
  const [sessions, setSession] = useState([]);
  const { data } = useQuery(userSessionsGql);

  useEffect(() => {
    if (data && data.userSessions) {
      setSession(data.userSessions);
    }
  }, [data]);

  if (!data || !data.userSessions) {
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  }
  return (
    <Main>
      <Section>
        <Typography component="h1" variant="h6">
          My Sessions
        </Typography>
      </Section>
      <Section>
        <Button variant="text">
          <Link to="/" component={RouterLink}>
            Home
          </Link>
        </Button>
        <Button variant="text">
          <Link to="/sessions/create" component={RouterLink}>
            Create New Session
          </Link>
        </Button>
      </Section>
      {sessions.map(session => (
        <Section key={session.id}>
          <Card className={classes.card}>
            <Link to={`/sessions/${session.publicId}`} component={RouterLink}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Session" className={classes.avatar}>
                    M
                  </Avatar>
                }
                title={session.publicId}
                subheader={session.status}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Go To Session
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Section>
      ))}
    </Main>
  );
};
export default Sessions;
