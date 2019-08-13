import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Avatar,
  Card,
  CardHeader,
  CircularProgress
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CreateIcon from '@material-ui/icons/Create';
import Main from 'layout/Main';
import useStyles from 'app/Theme';
import Title from 'layout/Title';
import { useQuery } from 'react-apollo';
import userSessionsGql from './gql/userSessions.gql';

const Home = () => {
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
      <Title
        title={`Welcome, ${userSessions[0].author.username}`}
        component="h1"
        variant="h5"
        color="textPrimary"
        align="left"
      />
      <Link to="/sessions" component={RouterLink} className={classes.form}>
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <CreateIcon />
              </Avatar>
            }
            title="My Sessions"
            subheader="Create, Edit, Preview and Start your sessions"
          />
        </Card>
      </Link>
      <Link to="/join" component={RouterLink} className={classes.form}>
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <SendIcon />
              </Avatar>
            }
            title="Join Session"
            subheader="Join an active session"
          />
        </Card>
      </Link>
    </Main>
  );
};
export default Home;
