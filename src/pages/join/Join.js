import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

const sessions = [
  { name: "Session1", id: "123", publicId: "hello", active: true },
  { name: "Session2", id: "1234", publicId: "hithere" },
  { name: "Session3", id: "12345", publicId: "nope" }
];

const Join = () => {
  const [timeoutFunction, setTimeoutFunction] = useState(null);
  const [session, setSession] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [requestsSent, setRequestsSent] = useState(0);
  const handleChange = e => {
    setPublicId(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeoutFunction(
      setTimeout(() => {
        console.log("Sending");
        setRequestsSent(requestsSent + 1);
        setSession(
          sessions.find(
            session => session.active && session.publicId === publicId
          )
        );
      }, 2000)
    );
  };

  useEffect(() => {
    setLoading(false);
  }, [requestsSent]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutFunction);
    };
  }, [timeoutFunction]);

  return (
    <div>
      {session && <Redirect to={`/${session.id}`} />}
      <form onSubmit={handleSubmit}>
        <label>Enter Session ID</label>
        <input type="text" onChange={handleChange} />
        <button type="submit" disabled={isLoading}>
          Join
        </button>
      </form>
      {isLoading && <div>Joining Session</div>}
      {!isLoading && !session && !!requestsSent && (
        <div>Could Not Find This Session</div>
      )}
      <Link to={`/`}>Home</Link>
    </div>
  );
};
export default Join;
