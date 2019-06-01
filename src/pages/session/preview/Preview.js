import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fakeData from "helpers/fakeData";
import Choice from "components/Choice";
import Question from "components/Question";
import CircularProgress from '@material-ui/core/CircularProgress';

const Preview = ({ match }) => {
  const sessionId = match.params.sessionId;
  const [session, setSession] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setSession({ name: "Session1", id: "123", questions: fakeData });
    }, 700);
  }, []);

  if (!session) return <CircularProgress />;

  return (
    <div>
      <div>Sessions ID: {sessionId}</div>
      <div>{session.name}</div>
      {session.questions.map((question, questionIndex) => (
        <Question
          label={`Question ${questionIndex + 1} : `}
          key={question.id}
          question={question}
        >
          {question.choices.map((choice, choiceIndex) => (
            <Choice
              label={`${choiceIndex + 1} - `}
              key={choice.id}
              choice={choice}
            />
          ))}
        </Question>
      ))}
      <Link to={`/sessions/${session.id}/edit`}>Edit This Session</Link>
      <Link to={`/sessions/${session.id}/start`}>Start This Session</Link>
      <Link to={`/sessions`}>Back To My Sessions</Link>
    </div>
  );
};
export default Preview;
