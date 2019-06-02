import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Section from "layout/Section";

const Choice = ({
  label,
  choice,
  children,
  editMode,
  handleBodyChange,
  handleDeleteChoice
}) => {
  return (
    <Grid container spacing={2}>
      {!editMode && (
        <Section flex="row flex-start">
          {label}
          {choice.body}
        </Section>
      )}
      {editMode && (
        <Section flex="row space-between">
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id={`bodyof${choice.id}`}
            label={label}
            name={`bodyof${choice.id}`}
            onChange={e => handleBodyChange(e.target.value)}
            value={choice.body}
          />
          <IconButton
            onClick={handleDeleteChoice}
            aria-label="Delete"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Section>
      )}
      {children}
    </Grid>
  );
};
Choice.propTypes = {
  label: PropTypes.string.isRequired,
  choice: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  handleBodyChange: PropTypes.func
};

Choice.defaultProps = {
  editMode: false,
  handleBodyChange: () =>
    console.log(
      "You Have Not Set A handleBodyChange Function For The Choice Inputs"
    )
};

export default Choice;
