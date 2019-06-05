import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Choice from 'components/Choice';
import Question from 'components/Question';
import Main from 'layout/Main';
import { useSession } from 'hooks/useSession';
import { Link, RouterLink, CircularProgress } from 'layout/material-ui/core';

const Start = ({ match, index }) => {
  const [question, setQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(index);
  const [session] = useSession(match.params.id);

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
      <div>Sessions ID: {session.id}</div>
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
