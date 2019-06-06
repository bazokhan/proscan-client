import React, { useContext } from 'react';
import Main from 'layout/Main';
import SessionForm from 'components/SessionForm';
import SessionContext from 'context/SessionContext';
import {
  Link,
  RouterLink,
  CircularProgress,
  Typography,
  Button,
  Avatar
} from 'layout/material-ui/core';
import { CreateIcon } from 'layout/material-ui/icons';
import Section from 'layout/Section';

const Edit = () => {
  const { session, setEditMode } = useContext(SessionContext);
  setEditMode(true);

  if (!session)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  return (
    <Main>
      <Section flex="column center">
        <Avatar>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Edit Session
        </Typography>
      </Section>
      <Section flex="row space-between">
        <Button variant="text">
          <Link to="/sessions" component={RouterLink}>
            Back To My Sessions
          </Link>
        </Button>
        <Button variant="text">
          <Link to={`/sessions/${session.id}`} component={RouterLink}>
            Return To Session Details
          </Link>
        </Button>
      </Section>
      <SessionForm />
    </Main>
  );
};

export default Edit;
