import React from 'react';
import PropTypes from 'prop-types';
import { ClearIcon } from 'layout/material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const Choice = ({
  choice,
  children,
  handleChoiceBodyChange,
  handleDeleteChoice
}) => (
  <>
    <TextField
      variant="standard"
      margin="normal"
      required
      fullWidth
      id={`bodyof${choice.id}`}
      name={`bodyof${choice.id}`}
      onChange={e => handleChoiceBodyChange(choice.id, e.target.value)}
    />
    <IconButton
      onClick={() => handleDeleteChoice(choice.id)}
      aria-label="Delete"
      size="small"
    >
      <ClearIcon />
    </IconButton>

    {children}
  </>
);

Choice.propTypes = {
  children: PropTypes.node,
  choice: PropTypes.object.isRequired,
  handleChoiceBodyChange: PropTypes.func.isRequired,
  handleDeleteChoice: PropTypes.func.isRequired
};

Choice.defaultProps = {
  children: null
};

export default Choice;
