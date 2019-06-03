import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Main from "layout/Main";
import useEditableSession from "hooks/useEditableSession";
import SessionForm from "components/SessionForm";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

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
      <SessionForm
        title="Edit Session"
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
export default Edit;
