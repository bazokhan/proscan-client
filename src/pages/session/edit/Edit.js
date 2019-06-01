import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fakeData from "helpers/fakeData";
import Choice from "components/Choice";
import Question from "components/Question";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { useStyles } from "app/Theme";

const Edit = ({ match }) => {
  const classes = useStyles();
  const sessionId = match.params.sessionId;
  const [session, setSession] = useState(null);
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSession({ name: "Session1", id: "123", questions: fakeData });
    }, 700);
  }, []);

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
  if (!session)
    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <CircularProgress />
        </div>
      </Container>
    );
  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <div>Sessions ID: {sessionId}</div>
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
                handleDeleteChoice={() =>
                  handleDeleteChoice(choiceIndex, questionIndex)
                }
              />
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
        {!editMode && (
          <Link to={`/sessions/${session.id}`}>
            <button>Save Session</button>
          </Link>
        )}
        <Link to={`/sessions/${session.id}/preview`}>Preview This Session</Link>
        <Link to={`/sessions/${session.id}/start`}>Start This Session</Link>
        <Link to={`/sessions`}>Back To My Sessions</Link>
      </div>
    </Container>
  );
};
export default Edit;
