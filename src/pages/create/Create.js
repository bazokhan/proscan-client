import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Choice from "components/Choice";
import Question from "components/Question";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "app/Theme";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Main from "layout/Main";
import Section from "layout/Section";

const Create = () => {
  const classes = useStyles();
  const [session, setSession] = useState({ name: "", questions: [] });
  const [editMode, setEditMode] = useState(true);

  const toggleEditMode = e => {
    e.preventDefault();
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
  if (!session) return <div>Loading...</div>;
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
      <form className={classes.form} noValidate>
        <Typography component="h2" variant="subtitle1">
          Session Title: {session.name}
        </Typography>
        {editMode && (
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
                  <CreateIcon />
                </InputAdornment>
              )
            }}
          />
        )}
        {session.questions.map((question, questionIndex) => (
          <Paper key={question.id} className={classes.paperCard}>
            <Question
              label={
                question.label === undefined
                  ? `Question ${questionIndex + 1} : `
                  : question.label
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
                    handleChoiceBodyChange(newBody, choiceIndex, questionIndex)
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
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                >
                  Add New Choice
                </Button>
              )}
            </Question>
          </Paper>
        ))}
        <Grid container spacing={3}>
          {editMode && (
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleAddNewQuestion}
              >
                Add New Question
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              onClick={toggleEditMode}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {editMode ? "Done" : "Edit"}
            </Button>
          </Grid>
          {!editMode && (
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save Session
              </Button>
            </Grid>
          )}

          <Grid item xs={12}>
            <Link to={`/sessions`} component={RouterLink}>
              Back To My Sessions
            </Link>
          </Grid>
        </Grid>
      </form>
    </Main>
  );
};
export default Create;
