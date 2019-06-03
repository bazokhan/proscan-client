import React from "react";
import Main from "layout/Main";
import { useEditableSession } from "hooks/useEditableSession";
import SessionForm from "components/SessionForm";
import {
  Link,
  CircularProgress,
  RouterLink,
  Button,
  Avatar,
  Typography
} from "layout/material-ui/core";
import { CreateIcon } from "layout/material-ui/icons";
import Section from "layout/Section";

const Create = () => {
  const [
    session,
    setSession,
    editMode,
    toggleEditMode,
    errors,
    handlers
  ] = useEditableSession();

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
          Create A New Session
        </Typography>
      </Section>
      <Section flex="row space-between">
        <Button variant="text">
          <Link to={`/`} component={RouterLink}>
            Home
          </Link>
        </Button>
        <Button variant="text">
          <Link to={`/sessions`} component={RouterLink}>
            Back To My Sessions
          </Link>
        </Button>
      </Section>
      <SessionForm
        title="Create A New Session"
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
export default Create;
