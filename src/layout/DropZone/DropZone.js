import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card, { CardMedia, CardActions } from 'layout/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DeleteIcon, ClearIcon, DoneIcon } from 'layout/material-ui/icons';

const useStyles = makeStyles(theme => ({
  thumbContainer: {
    marginBottom: theme.spacing(2)
  },
  thumb: {
    height: theme.spacing(10) * 2,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#EEE'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  },
  dropZone: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    cursor: 'pointer',
    marginBottom: theme.spacing(3)
  },
  dropZoneContainer: {
    padding: theme.spacing(1)
  }
}));

const DropZone = ({ handleSubmit, images }) => {
  const classes = useStyles();
  const [files, setFiles] = useState(images);
  const [editMode, setEditMode] = useState(true);

  const handleDeleteImage = fileName => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const filteredAcceptedFiles = acceptedFiles.filter(newFile =>
        files.every(oldFile => oldFile.name !== newFile.name)
      );
      setFiles([
        ...files,
        ...filteredAcceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      ]);
    }
  });

  const thumbs = files.map(file => (
    <Grid item xs={12} md={6} key={file.name}>
      <Card className={classes.thumbContainer}>
        <CardMedia src={file.preview} className={classes.thumb}>
          <img src={file.preview} alt={file.name} className={classes.img} />
        </CardMedia>
        {editMode && (
          <CardActions>
            <IconButton onClick={() => handleDeleteImage(file.name)}>
              <ClearIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </Grid>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Grid container direction="column" align="stretch" item xs={12}>
      <Paper className={classes.dropZoneContainer}>
        <Grid container direction="column" align="stretch" item xs={12}>
          {editMode && (
            <Paper
              {...getRootProps()}
              className={classes.dropZone}
              elevation={0}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon />
              <Typography align="center">
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </Typography>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} container spacing={2}>
          {thumbs}
        </Grid>
        <Grid container spacing={2} item>
          {editMode ? (
            <Fragment>
              <Grid item xs={6}>
                <Button
                  variant="text"
                  fullWidth
                  disabled={!files.length}
                  onClick={() => setFiles([])}
                >
                  Clear All Images
                  <DeleteIcon />
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="text"
                  fullWidth
                  disabled={!files.length}
                  onClick={() => {
                    handleSubmit(files);
                    setEditMode(false);
                  }}
                >
                  Upload Images &nbsp;
                  <DoneIcon />
                </Button>
              </Grid>
            </Fragment>
          ) : (
            <Grid item xs={12}>
              <Button
                variant="text"
                fullWidth
                disabled={!files.length}
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
};

DropZone.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  images: PropTypes.array
};

DropZone.defaultProps = {
  images: []
};

export default DropZone;
