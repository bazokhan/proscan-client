import React from 'react';
import {
  Link,
  RouterLink,
  Avatar,
  Card,
  Grid,
  CardHeader
} from 'layout/material-ui/core';
import { SendIcon, CreateIcon } from 'layout/material-ui/icons';
import Main from 'layout/Main';
import useStyles from 'app/Theme';
import NewSection from 'layout/Section';
import Title from 'layout/Title';

const Home = () => {
  const classes = useStyles();
  return (
    <Main>
      <NewSection spacing={3}>
        <Title
          title="Welcome, Mohamed!"
          component="h1"
          variant="h5"
          color="textPrimary"
          align="left"
        />
      </NewSection>
      <NewSection spacing={3}>
        <Grid item xs={12} md={6}>
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
        </Grid>
        <Grid item xs={12} md={6}>
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
        </Grid>
      </NewSection>
    </Main>
  );
};
export default Home;
