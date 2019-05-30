import React, { useState } from "react";
import { Link } from "react-router-dom";
import fakeData from "helpers/fakeData";
import Choice from "components/Choice";
import Question from "components/Question";

const session = { name: "Session1", id: "123" };
const questions = fakeData;

const Edit = ({ match }) => {
  const sessionId = match.params.sessionId;
  const [editMode, setEditMode] = useState(false);
  const [sessionName, setSessionName] = useState(session.name);
  const [sessionQuestions, setSessionQuestions] = useState(questions);

  const toggleEditMode = () => setEditMode(!editMode);

  const handleQuestionBodyChange = (newBody, questionIndex) => {
    const question = sessionQuestions[questionIndex];
    const newQuestion = { ...question, body: newBody };
    setSessionQuestions(
      sessionQuestions.map((question, index) => {
        return index === questionIndex ? newQuestion : question;
      })
    );
  };

  const handleQuestionLabelChange = (newLabel, questionIndex) => {
    const question = sessionQuestions[questionIndex];
    const newQuestion = { ...question, label: newLabel };
    setSessionQuestions(
      sessionQuestions.map((question, index) => {
        return index === questionIndex ? newQuestion : question;
      })
    );
  };

  const handleChoiceBodyChange = (newBody, choiceIndex, questionIndex) => {
    console.log({ sessionQuestions });
    const question = sessionQuestions[questionIndex];
    const choice = question.choices[choiceIndex];
    const newChoice = { ...choice, body: newBody };
    const newQuestion = {
      ...question,
      choices: question.choices.map((choice, i) => {
        return i === choiceIndex ? newChoice : choice;
      })
    };
    setSessionQuestions(
      sessionQuestions.map((question, i) => {
        return i === questionIndex ? newQuestion : question;
      })
    );
  };

  const handleAddNewQuestion = () => {
    setSessionQuestions([
      ...sessionQuestions,
      { id: `q${Math.random()}`, body: "", choices: [] }
    ]);
  };

  const handleAddNewChoice = questionIndex => {
    setSessionQuestions(
      sessionQuestions.map((question, i) => {
        return i === questionIndex
          ? {
              ...question,
              choices: [
                ...question.choices,
                { id: `c${Math.random()}`, body: "" }
              ]
            }
          : question;
      })
    );
  };

  const handleDeleteChoice = (choiceIndex, questionIndex) => {
    const question = sessionQuestions[questionIndex];
    const newQuestion = {
      ...question,
      choices: question.choices.filter((choice, i) => {
        return i !== choiceIndex;
      })
    };
    setSessionQuestions(
      sessionQuestions.map((question, i) => {
        return i === questionIndex ? newQuestion : question;
      })
    );
  };

  return (
    <div>
      <div>Sessions ID: {sessionId}</div>
      <div>Name: {sessionName}</div>
      {editMode && (
        <input
          type="text"
          onChange={e => {
            setSessionName(e.target.value);
          }}
          value={sessionName}
        />
      )}
      {sessionQuestions.map((question, questionIndex) => (
        <Question
          label={
            question.label === undefined
              ? `Question ${questionIndex + 1} : `
              : question.label
          }
          question={question}
          key={question.id}
          editMode={editMode}
          handleBodyChange={newBody =>
            handleQuestionBodyChange(newBody, questionIndex)
          }
          handleLabelChange={newLabel =>
            handleQuestionLabelChange(newLabel, questionIndex)
          }
        >
          {question.choices.map((choice, choiceIndex) => (
            <Choice
              label={`${choiceIndex + 1} - `}
              choice={choice}
              key={choice.id}
              editMode={editMode}
              handleBodyChange={newBody =>
                handleChoiceBodyChange(newBody, choiceIndex, questionIndex)
              }
            >
              {editMode && (
                <button
                  onClick={() => handleDeleteChoice(choiceIndex, questionIndex)}
                >
                  X
                </button>
              )}
            </Choice>
          ))}
          {editMode && (
            // TODO: Warning: A component is changing an uncontrolled input of type text to be controlled.
            // in input (at Choice.js:9)
            // in div (at Choice.js:5)
            // in Choice (at Edit.js:56)
            // in div (at Question.js:12)
            // in Question (at Edit.js:29)
            // in div (at Edit.js:16)
            // in Edit (created by LoadableComponent)
            <button onClick={() => handleAddNewChoice(questionIndex)}>
              Add New Choice
            </button>
          )}
        </Question>
      ))}
      {editMode && (
        <button onClick={handleAddNewQuestion}>Add New Question</button>
      )}
      <button onClick={toggleEditMode}>{editMode ? "Done" : "Edit"}</button>
      {!editMode && <button onClick={() => {}}>Save Session</button>}
      <Link to={`/sessions/${session.id}/preview`}>Preview This Session</Link>
      <Link to={`/sessions/${session.id}/start`}>Start This Session</Link>
      <Link to={`/sessions`}>Back To My Sessions</Link>
    </div>
  );
};
export default Edit;
