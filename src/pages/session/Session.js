import React from "react";
import { Link } from "react-router-dom";

const session = { name: "Session1", id: "123" };
const Sessions = ({ match }) => {
  console.log(match);
  const sessionId = match.params.sessionId;
  return (
    <div>
      <div>Sessions ID: {sessionId}</div>
      <div>{session.name}</div>
      <Link to={`/sessions/${session.id}/edit`}>Edit This Session</Link>
      <Link to={`/sessions/${session.id}/preview`}>Preview This Session</Link>
      <Link to={`/sessions/${session.id}/start`}>Start This Session</Link>
      <Link to={`/sessions`}>Back To My Sessions</Link>
    </div>
  );
};
export default Sessions;
