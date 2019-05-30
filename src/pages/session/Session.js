import React from "react";
import { Link } from "react-router-dom";
import fakeData from "helpers/fakeData";
import Choice from "components/Choice";
import Question from "components/Question";

const session = { name: "Session1", id: "123" };
const sessionQuestions = fakeData;

const Sessions = ({ match }) => {
  const sessionId = match.params.sessionId;
  return (
    <div>
      <div>Sessions ID: {sessionId}</div>
      <div>{session.name}</div>
      {sessionQuestions.map((question, questionIndex) => (
        <Question label={`Question ${questionIndex + 1} : `} key={question.id} question={question}>
          {question.choices.map((choice, choiceIndex) => (
            <Choice label={`${choiceIndex + 1} - `} key={choice.id} choice={choice} />
          ))}
        </Question>
      ))}
      <Link to={`/sessions/${session.id}/edit`}>Edit This Session</Link>
      <Link to={`/sessions/${session.id}/preview`}>Preview This Session</Link>
      <Link to={`/sessions/${session.id}/start`}>Start This Session</Link>
      <Link to={`/sessions`}>Back To My Sessions</Link>
    </div>
  );
};
export default Sessions;
