import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ClearIcon } from 'layout/material-ui/icons';
import { IconButton, TextField } from 'layout/material-ui/core';
import Section from 'layout/Section';

const Choice = ({
  label,
  choice,
  children,
  editMode,
  handleBodyChange,
  handleDeleteChoice
}) => (
  <Fragment>
    {editMode ? (
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
          <ClearIcon />
        </IconButton>
      </Section>
    ) : (
      <Section flex="row flex-start">
        {label}
        {choice.body}
      </Section>
    )}
    {children}
  </Fragment>
);
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
      'You Have Not Set A handleBodyChange Function For The Choice Inputs'
    )
};

export default Choice;
