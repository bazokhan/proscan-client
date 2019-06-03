import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { TextField, Typography, IconButton } from "layout/material-ui/core";
import { DeleteIcon } from "layout/material-ui/icons";
import Section from "layout/Section";

const Question = ({
  label,
  question,
  editMode,
  children,
  handleLabelChange,
  handleBodyChange
}) => (
  <Fragment>
    <Section flex="column flex-start" borderBottom>
      {!editMode && <Typography variant="h6">{label}</Typography>}
      {editMode && (
        <Section flex="row space-between">
          <Typography variant="h6">{label}</Typography>
          <IconButton size="small">
            <DeleteIcon />
          </IconButton>
        </Section>
      )}
      {/* {!editMode && <Typography variant="h6">{label}</Typography>} */}
      {/* {editMode && (
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id={`labelof${question.id}`}
          label="Label"
          name={`labelof${question.id}`}
          onChange={e => handleLabelChange(e.target.value)}
          value={label}
        />
      )} */}
      {!editMode && (
        <Typography variant="subtitle1">{question.body}</Typography>
      )}
      {editMode && (
        <TextField
          variant="outlined"
          margin="normal"
          required
          multiline
          fullWidth
          id={`bodyof${question.id}`}
          label="Question Text"
          name={`bodyof${question.id}`}
          onChange={e => handleBodyChange(e.target.value)}
          value={question.body}
        />
      )}
    </Section>
    {children}
  </Fragment>
);
Question.propTypes = {
  label: PropTypes.string,
  question: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  handleLabelChange: PropTypes.func,
  handleBodyChange: PropTypes.func
};

Question.defaultProps = {
  label: "*",
  editMode: false,
  handleLabelChange: () =>
    console.log(
      "You Have Not Set A handleLabelChange Function For The Question Inputs"
    ),
  handleBodyChange: () =>
    console.log(
      "You Have Not Set A handleBodyChange Function For The Question Inputs"
    )
};

export default Question;
