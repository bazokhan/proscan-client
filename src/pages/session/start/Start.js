import React, { useState, useEffect, useContext } from 'react';
import Choice from 'components/Choice';
import Question from 'components/Question';
import Main from 'layout/Main';
import {
  Link,
  RouterLink,
  CircularProgress,
  Button
} from 'layout/material-ui/core';
import SessionContext from 'context/SessionContext';

const Start = () => {
  const { session, setEditMode } = useContext(SessionContext);
  console.log({ sessionFromStart: session });
  const [question, setQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  useEffect(() => {
    setEditMode(false);
  }, [setEditMode]);

  useEffect(() => {
    if (session && session.activeQuestion) {
      const activeQuestion = session.questions.find(
        q => q.id === session.activeQuestion
      );
      setQuestionIndex(session.questions.indexOf(activeQuestion));
    }
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
  console.log({ activeQuestion: session.activeQuestion, question });

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
      <div>Sessions ID: {session.publicId}</div>
      <div>{session.name}</div>
      <Question
        label={`Question ${questionIndex + 1} : `}
        key={question.id}
        question={question}
      >
        <Button onClick={() => handleNavClick(-1)}>Previous</Button>
        <Button onClick={() => handleNavClick(1)}>Next</Button>
        {question.choices.map((choice, choiceIndex) => (
          <Choice
            label={`${choiceIndex + 1} - `}
            key={choice.id}
            choice={choice}
          />
        ))}
      </Question>
      <Link to={`/sessions/${session.publicId}`} component={RouterLink}>
        Stop This Session
      </Link>
    </Main>
  );
};

export default Start;
