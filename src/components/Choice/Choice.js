import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const Choice = ({
  label,
  choice,
  children,
  editMode,
  handleBodyChange,
  handleDeleteChoice
}) => (
  <Grid container>
    {!editMode && <Grid item>{label}</Grid> && <Grid>{choice.body}</Grid>}
    {editMode && (
      <React.Fragment>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            required
              fullWidth
            id={`bodyof${choice.id}`}
            label="Body"
            name={`bodyof${choice.id}`}
            onChange={e => handleBodyChange(e.target.value)}
            value={choice.body}
          />
          {/* {editMode && ( */}
        </Grid>
        <Grid item xs>
          <Button onClick={handleDeleteChoice}>X</Button>
        </Grid>
      </React.Fragment>

      //   <input
      //     type="text"
      //     name={`bodyof${choice.id}`}
      //     onChange={e => handleBodyChange(e.target.value)}
      //     value={choice.body}
      //   />
    )}
    {children}
  </Grid>
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
      "You Have Not Set A handleBodyChange Function For The Choice Inputs"
    )
};

export default Choice;
