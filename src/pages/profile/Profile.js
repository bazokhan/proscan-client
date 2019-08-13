import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from 'app/Theme';
import Main from 'layout/Main';
import {
  Link,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Button,
  Avatar,
  Typography
} from '@material-ui/core';
import { useQuery } from 'react-apollo';
import userSessionsGql from './gql/userSessions.gql';

const Profile = () => {
  const classes = useStyles();

  const { data } = useQuery(userSessionsGql);
  const { userSessions, loading, error } = data;
  if (error) {
    return <div>Error, {error.message}</div>;
  }
  if (loading) {
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  }
  if (!userSessions || !userSessions.length) {
    return <div>You have no sessions yet</div>;
  }

  return (
    <Main>
      <Typography component="h1" variant="h6">
        My Sessions
      </Typography>
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
      {userSessions.map(session => (
        <Card className={classes.card} key={session.publicId}>
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
      ))}
    </Main>
  );
};
export default Profile;
