import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Choice from "components/Choice";
import Question from "components/Question";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import TitleIcon from "@material-ui/icons/Title";
import DoneIcon from "@material-ui/icons/Done";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "app/Theme";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Main from "layout/Main";
import Section from "layout/Section";
import ButtonGrid from "layout/ButtonGrid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";

const Create = () => {
  const classes = useStyles();
  const [session, setSession] = useState({ name: "", questions: [] });
  const [editMode, setEditMode] = useState(true);
  const [hasErrors, setErrors] = useState(false);

  const toggleEditMode = e => {
    e.preventDefault();
    setErrors(
      !(
        session &&
        session.questions.length > 0 &&
        session.questions.every(
          question =>
            question.choices &&
            question.choices.length &&
            question.choices.every(choice => choice.body)
        )
      )
    );
    setEditMode(!editMode);
  };

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

  const handleAddNewQuestion = e => {
    e.preventDefault();
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
      <Main>
        <CircularProgress />
      </Main>
    );
  return (
    <Main>
      <Section flex="column center">
        <Avatar className={classes.avatar}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Create New Session
        </Typography>
      </Section>
      <Section flex="column center">
        <form className={classes.form} noValidate>
          {editMode ? (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={`sessonName`}
              label="Name"
              name={`sessonName`}
              onChange={e => {
                setSession({ ...session, name: e.target.value });
              }}
              value={session.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon />
                  </InputAdornment>
                )
              }}
            />
          ) : (
            <Section flex="row space-between">
              <Typography component="h2" variant="h6">
                {session.name}
              </Typography>
              <Button
                onClick={toggleEditMode}
                variant="text"
                color="default"
                className={classes.submit}
              >
                Edit
              </Button>
            </Section>
          )}
          {editMode && (
            <ButtonGrid>
              <Button
                variant="text"
                color="default"
                className={classes.submit}
                onClick={handleAddNewQuestion}
              >
                <AddIcon />
                Add New Question
              </Button>
            </ButtonGrid>
          )}
          {session.questions.map((question, questionIndex) => (
            <Paper key={question.id} className={classes.paper}>
              <Question
                label={
                  question.label
                    ? question.label
                    : `Question ${questionIndex + 1} : `
                }
                question={question}
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
                      handleChoiceBodyChange(
                        newBody,
                        choiceIndex,
                        questionIndex
                      )
                    }
                    handleDeleteChoice={() =>
                      handleDeleteChoice(choiceIndex, questionIndex)
                    }
                  />
                ))}
                {editMode && (
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      handleAddNewChoice(questionIndex);
                    }}
                    // fullWidth
                    variant="text"
                    color="default"
                    className={classes.submit}
                  >
                    <AddIcon />
                    Add New Choice
                  </Button>
                )}
              </Question>
            </Paper>
          ))}
          {!editMode && hasErrors && (
            <Typography variant="subtitle1" color="error">
              This session can not be saved, Please go back to Edit Mode
            </Typography>
          )}
          {editMode ? (
            <Section flex="column center">
              <Fab
                onClick={toggleEditMode}
                variant="extended"
                color="default"
                className={classes.submit}
              >
                Done
                <DoneIcon className={classes.rightIcon} />
              </Fab>
            </Section>
          ) : (
            <ButtonGrid>
              <Button
                variant="contained"
                color="default"
                className={classes.submit}
                disabled={hasErrors}
              >
                Save Session
                <CloudDoneIcon className={classes.rightIcon} />
              </Button>
            </ButtonGrid>
          )}
          <Link to={`/sessions`} component={RouterLink}>
            Back To My Sessions
          </Link>
        </form>
      </Section>
    </Main>
  );
};
export default Create;
