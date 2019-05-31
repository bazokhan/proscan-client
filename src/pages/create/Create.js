import React, { useState } from "react";
import { Link } from "react-router-dom";
import Choice from "components/Choice";
import Question from "components/Question";

const Create = () => {
  const [session, setSession] = useState({ name: "", questions: [] });
  const [editMode, setEditMode] = useState(true);

  const toggleEditMode = () => setEditMode(!editMode);

  const handleQuestionBodyChange = (newBody, questionIndex) => {
    const question = session.questions[questionIndex];
    const newQuestion = { ...question, body: newBody };
    setSession({
      ...session,
      questions: session.questions.map((question, index) => {
        return index === questionIndex ? newQuestion : question;
      })
    });
  };

  const handleQuestionLabelChange = (newLabel, questionIndex) => {
    const question = session.questions[questionIndex];
    const newQuestion = { ...question, label: newLabel };
    setSession({
      ...session,
      questions: session.questions.map((question, index) => {
        return index === questionIndex ? newQuestion : question;
      })
    });
  };

  const handleChoiceBodyChange = (newBody, choiceIndex, questionIndex) => {
    const question = session.questions[questionIndex];
    const choice = question.choices[choiceIndex];
    const newChoice = { ...choice, body: newBody };
    const newQuestion = {
      ...question,
      choices: question.choices.map((choice, i) => {
        return i === choiceIndex ? newChoice : choice;
      })
    };
    setSession({
      ...session,
      questions: session.questions.map((question, i) => {
        return i === questionIndex ? newQuestion : question;
      })
    });
  };

  const handleAddNewQuestion = () => {
    setSession({
      ...session,
      questions: [
        ...session.questions,
        { id: `q${Math.random()}`, body: "", choices: [] }
      ]
    });
  };

  const handleAddNewChoice = questionIndex => {
    setSession({
      ...session,
      questions: session.questions.map((question, i) => {
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
    });
  };

  const handleDeleteChoice = (choiceIndex, questionIndex) => {
    const question = session.questions[questionIndex];
    const newQuestion = {
      ...question,
      choices: question.choices.filter((choice, i) => {
        return i !== choiceIndex;
      })
    };
    setSession({
      ...session,
      questions: session.questions.map((question, i) => {
        return i === questionIndex ? newQuestion : question;
      })
    });
  };
  if (!session) return <div>Loading...</div>;
  return (
    <div>
      <div>Create New Session</div>
      <div>Name: {session.name}</div>
      {editMode && (
        <input
          type="text"
          onChange={e => {
            setSession({ ...session, name: e.target.value });
          }}
          value={session.name}
        />
      )}
      {session.questions.map((question, questionIndex) => (
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
      {!editMode && <button>Save Session</button>}
      <Link to={`/sessions`}>Back To My Sessions</Link>
    </div>
  );
};
export default Create;
