import React from 'react';
import PropTypes from 'prop-types';
import Main from 'layout/Main';
import useEditableSession from 'hooks/useEditableSession';
import SessionForm from 'components/SessionForm';
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

const Edit = ({ match }) => {
  const [
    session,
    setSession,
    editMode,
    toggleEditMode,
    errors,
    handlers
  ] = useEditableSession(match.params.sessionId);

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
      <SessionForm
        title="Edit Session"
        session={session}
        setSession={setSession}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
        errors={errors}
        handlers={handlers}
      />
    </Main>
  );
};

Edit.propTypes = {
  match: PropTypes.object.isRequired
};

export default Edit;
