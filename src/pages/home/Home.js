import React, { useContext } from 'react';
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
import AuthContext from 'context/AuthContext';
import profileGql from './gql/profile.gql';

const Home = () => {
  const classes = useStyles();
  const { authToken } = useContext(AuthContext);
  const { data } = useQuery(profileGql);

  if (!authToken) {
    return (
      <Main>
        <Title
          title="Welcome, Guest"
          component="h1"
          variant="h5"
          color="textPrimary"
          align="left"
        />
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
  }

  if (!data) return <div>Error Please Refresh !!!</div>;
  const { profile, loading, error } = data;
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
  return (
    <Main>
      <Title
        title={`Welcome, ${profile ? profile.username : 'Guest'}`}
        component="h1"
        variant="h5"
        color="textPrimary"
        align="left"
      />
      {profile ? (
        <>
          <div>
            You currently have{' '}
            {profile.sessions ? profile.sessions.length : 'No'} sessions
          </div>
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
        </>
      ) : null}
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
