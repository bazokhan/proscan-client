import React, { useContext } from 'react';
import Choice from 'components/Choice';
import Question from 'components/Question';
import useStyles from 'app/Theme';
import Section from 'layout/Section';
import { AddIcon, DoneIcon, CloudDoneIcon } from 'layout/material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import SessionContext from 'context/SessionContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorMessage from './ErrorMessage';

const SessionForm = () => {
  const classes = useStyles();
  const {
    session,
    editMode,
    toggleEditMode,
    errors,
    handleSessionNameChange,
    handleAddNewQuestion,
    handleAddNewChoice
  } = useContext(SessionContext);

  if (!session) return <CircularProgress />;

  return (
    <form className={classes.form} noValidate>
      {editMode ? (
        <Section>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="sessonName"
            label="Name"
            name="sessonName"
            onChange={e => {
              handleSessionNameChange(e.target.value);
            }}
            value={session.name}
          />
          <Button
            variant="text"
            color="default"
            className={classes.submit}
            onClick={handleAddNewQuestion}
          >
            <AddIcon />
            Add New Question
          </Button>
        </Section>
      ) : (
        <Section>
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
          {errors.length > 0 &&
            errors.map(error => (
              <ErrorMessage key={error.field} error={error} />
            ))}
        </Section>
      )}
      <Section>
        {session.questions.map((question, questionIndex) => (
          <Paper key={question.id} className={classes.paper}>
            <Typography color="primary">
              {`Question ${questionIndex + 1} : `}
            </Typography>
            <Question question={question}>
              {question.choices.map((choice, choiceIndex) => (
                <Grid key={choice.id}>
                  <Avatar>{choiceIndex + 1}</Avatar>
                  <Choice choice={choice} />
                </Grid>
              ))}
              {editMode && (
                <Button
                  onClick={() => {
                    handleAddNewChoice(questionIndex);
                  }}
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
      </Section>
      {editMode ? (
        <Section>
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
        <Section>
          <Button
            variant="contained"
            color="default"
            className={classes.submit}
            disabled={errors.length > 0}
            onClick={() => {
              console.log({ session });
            }}
          >
            Save Session
            <CloudDoneIcon className={classes.rightIcon} />
          </Button>
        </Section>
      )}
    </form>
  );
};

export default SessionForm;
