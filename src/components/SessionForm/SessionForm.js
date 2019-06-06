import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Choice from 'components/Choice';
import Question from 'components/Question';
import useStyles from 'app/Theme';
import Section from 'layout/Section';
import ButtonGrid from 'layout/ButtonGrid';
import { AddIcon, DoneIcon, CloudDoneIcon } from 'layout/material-ui/icons';
import {
  Typography,
  Button,
  TextField,
  Paper,
  Fab
} from 'layout/material-ui/core';

const SessionForm = ({
  session,
  setSession,
  editMode,
  toggleEditMode,
  errors,
  handlers
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Section flex="column center">
        <form className={classes.form} noValidate>
          {editMode ? (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="sessonName"
              label="Name"
              name="sessonName"
              onChange={e => {
                setSession({ ...session, name: e.target.value });
              }}
              value={session.name}
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
                onClick={handlers.handleAddNewQuestion}
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
                  handlers.handleQuestionBodyChange(newBody, questionIndex)
                }
                handleLabelChange={newLabel =>
                  handlers.handleQuestionLabelChange(newLabel, questionIndex)
                }
                handleUploadImages={images =>
                  handlers.handleUploadImages(images, questionIndex)
                }
              >
                {question.choices.map((choice, choiceIndex) => (
                  <Choice
                    label={`${choiceIndex + 1} - `}
                    choice={choice}
                    key={choice.id}
                    editMode={editMode}
                    handleBodyChange={newBody =>
                      handlers.handleChoiceBodyChange(
                        newBody,
                        choiceIndex,
                        questionIndex
                      )
                    }
                    handleDeleteChoice={() =>
                      handlers.handleDeleteChoice(choiceIndex, questionIndex)
                    }
                  />
                ))}
                {editMode && (
                  <Button
                    onClick={() => {
                      handlers.handleAddNewChoice(questionIndex);
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
          {!editMode && errors.length > 0 && (
            <Typography variant="subtitle1" color="error">
              This session can not be saved, Please go back to Edit Mode
              {errors.map(error => (
                <div key={error.field}>{error.message}</div>
              ))}
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
                disabled={errors.length > 0}
                onClick={() => {
                  console.log({ session });
                }}
              >
                Save Session
                <CloudDoneIcon className={classes.rightIcon} />
              </Button>
            </ButtonGrid>
          )}
        </form>
      </Section>
    </Fragment>
  );
};

SessionForm.propTypes = {
  session: PropTypes.object.isRequired,
  setSession: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  handlers: PropTypes.object.isRequired
};

export default SessionForm;
