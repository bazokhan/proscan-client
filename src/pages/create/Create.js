import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Main from "layout/Main";
import CircularProgress from "@material-ui/core/CircularProgress";
import useEditableSession from "hooks/useEditableSession";
import SessionForm from "components/SessionForm";

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
      <SessionForm
        title="Create A New Session"
        session={session}
        setSession={setSession}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
        errors={errors}
        handlers={handlers}
      />
      <Link to={`/sessions`} component={RouterLink}>
        Back To My Sessions
      </Link>
    </Main>
  );
};
export default Create;
