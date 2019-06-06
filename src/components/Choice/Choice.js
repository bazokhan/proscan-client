import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ClearIcon } from 'layout/material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Section from 'layout/NewSection';
import SessionContext from 'context/SessionContext';

const Choice = ({ choice, children }) => {
  const [body, setBody] = useState(choice.body);
  const { editMode, handleChoiceBodyChange, handleDeleteChoice } = useContext(
    SessionContext
  );
  return (
    <Fragment>
      {editMode ? (
        <Section>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id={`bodyof${choice.id}`}
            name={`bodyof${choice.id}`}
            onBlur={() => handleChoiceBodyChange(choice.id, body)}
            onChange={e => setBody(e.target.value)}
            value={body}
          />
          <IconButton
            onClick={() => handleDeleteChoice(choice.id)}
            aria-label="Delete"
            size="small"
          >
            <ClearIcon />
          </IconButton>
        </Section>
      ) : (
        <Section>{choice.body}</Section>
      )}
      {children}
    </Fragment>
  );
};
Choice.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  choice: PropTypes.object.isRequired
};

Choice.defaultProps = {
  children: null
};

export default Choice;
