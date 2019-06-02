import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import fakeData from "helpers/fakeData";
import Choice from "components/Choice";
import Question from "components/Question";
import CircularProgress from "@material-ui/core/CircularProgress";
import Main from "layout/Main";
import Link from "@material-ui/core/Link";

const Start = ({ match, index }) => {
  const sessionId = match.params.sessionId;
  const [session, setSession] = useState(null);
  const [question, setQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(index);

  useEffect(() => {
    setTimeout(() => {
      setSession({ name: "Session1", id: "123", questions: fakeData });
    }, 700);
  }, []);

  useEffect(() => {
    if (session) {
      setQuestion(session.questions[questionIndex]);
    }
  }, [session, questionIndex]);

  const handleNavClick = value => {
    const newIndex = questionIndex + value;
    if (newIndex <= session.questions.length - 1 && newIndex >= 0) {
      setQuestionIndex(newIndex);
    }
  };

  if (!session)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  if (!question)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );

  return (
    <Main>
      <div>Sessions ID: {sessionId}</div>
      <div>{session.name}</div>
      <Question
        label={`Question ${questionIndex + 1} : `}
        key={question.id}
        question={question}
      >
        <button onClick={() => handleNavClick(-1)}>Previous</button>
        <button onClick={() => handleNavClick(1)}>Next</button>
        {question.choices.map((choice, choiceIndex) => (
          <Choice
            label={`${choiceIndex + 1} - `}
            key={choice.id}
            choice={choice}
          />
        ))}
      </Question>
      <Link to={`/sessions/${session.id}`} component={RouterLink}>
        Stop This Session
      </Link>
    </Main>
  );
};

Start.propTypes = {
  index: PropTypes.number
};

Start.defaultProps = {
  index: 0
};

export default Start;
