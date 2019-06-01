import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
// import Card from "@material-ui/core/Card";
import { useStyles } from "app/Theme";

const Choice = ({
  label,
  choice,
  children,
  editMode,
  handleBodyChange,
  handleDeleteChoice
}) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {!editMode && (
        <Fragment>
          <Grid item xs={1}>
            {label}
          </Grid>{" "}
          {/* <Grid item xs={3} /> */}
          <Grid item xs={11}>
            {choice.body}
          </Grid>
        </Fragment>
      )}
      {editMode && (
        <Fragment>
        <Grid item xs={11}>
          {/* <Grid item xs={11}> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={`bodyof${choice.id}`}
            label={label}
            name={`bodyof${choice.id}`}
            onChange={e => handleBodyChange(e.target.value)}
            value={choice.body}
          />
          {/* {editMode && ( */}
          {/* </Grid> */}
          {/* <Grid item xs={1} /> */}
          {/* <Grid item xs={1}> */}
          </Grid>
          <Grid item xs={1}>
          <Fab onClick={handleDeleteChoice} aria-label="Delete" className={classes.fab}>
            <DeleteIcon />
          </Fab>
          {/* </Grid> */}
        </Grid>
        </Fragment>

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
