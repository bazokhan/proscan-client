import React from "react";
import { Link } from "react-router-dom";

const sessions = [
  { name: "Session1", id: "123" },
  { name: "Session2", id: "1234" },
  { name: "Session3", id: "12345" }
];

const Sessions = () => (
  <div>
    <div>My Sessions</div>
    {sessions.map(session => (
      <div key={session.id}>
        <div>{session.name || "unnamed session"}</div>
        <Link to={`/sessions/${session.id}`}>Go To Session</Link>
      </div>
    ))}
    <Link to={`/sessions/create`}>Create New Session</Link>
  </div>
);
export default Sessions;
