import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import fakeData from "helpers/fakeData";
import Choice from "components/Choice";
import Question from "components/Question";
import Main from "layout/Main";
import Link from "@material-ui/core/Link";

const Joined = ({ match, index }) => {
  const sessionId = match.params.sessionId;
  const [session, setSession] = useState(null);
  const [question, setQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(index);
  const [answers, setAnswers] = useState({});

  const handleChoiceChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  useEffect(() => {
    setTimeout(() => {
      setSession({ name: "Session1", id: "123", questions: fakeData });
    }, 700);
    setTimeout(() => {
      setQuestionIndex(q => q + 1);
    }, 7000);
  }, []);

  useEffect(() => {
    if (session) {
      setQuestion(session.questions[questionIndex]);
    }
  }, [session, questionIndex]);

  if (!session) return <div>Loading...</div>;
  if (!question) return <div>Loading...</div>;

  return (
    <Main>
      <div>Sessions ID: {sessionId}</div>
      <div>{session.name}</div>
      <Question
        label={`Question ${questionIndex + 1} : `}
        key={question.id}
        question={question}
      >
        {question.choices.map((choice, choiceIndex) => (
          <React.Fragment key={choice.id}>
            <button onClick={() => handleChoiceChange(question.id, choice.id)}>
              Choose
            </button>
            <Choice label={`${choiceIndex + 1} - `} choice={choice} />
          </React.Fragment>
        ))}
      </Question>
      {Object.keys(answers).map(key => {
        return (
          <React.Fragment key={key}>
            <div>Question: {key}</div>
            <div>Choice: {answers[key]}</div>
          </React.Fragment>
        );
      })}
      <Link to={`/join`} component={RouterLink}>
        Exit This Session
      </Link>
    </Main>
  );
};

Joined.propTypes = {
  index: PropTypes.number
};

Joined.defaultProps = {
  index: 0
};

export default Joined;
