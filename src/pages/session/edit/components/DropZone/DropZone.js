import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { ClearIcon } from 'layout/material-ui/icons';

const DropZone = ({ handleSubmit, images }) => {
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
    <div>
      <img src={file.preview} alt={file.name} />

      {editMode && (
        <button type="button" onClick={() => handleDeleteImage(file.name)}>
          <ClearIcon />
        </button>
      )}
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div>
      {editMode && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        </div>
      )}
      <div>{thumbs}</div>
      {editMode ? (
        <>
          <button
            type="button"
            disabled={!files.length}
            onClick={() => setFiles([])}
          >
            Clear
          </button>
          <button
            type="button"
            disabled={!files.length}
            onClick={() => {
              handleSubmit(files);
              setEditMode(false);
            }}
          >
            Upload
          </button>
        </>
      ) : (
        <button
          type="button"
          disabled={!files.length}
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
      )}
    </div>
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
