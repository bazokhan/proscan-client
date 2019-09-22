import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// import { ClearIcon } from 'layout/material-ui/icons';

const DropZone = ({ handleSubmit, images }) => {
  const [imageUrls, setImageUrls] = useState(images);
  const [files, setFiles] = useState([]);
  const [editMode, setEditMode] = useState(true);

  // const handleDeleteImage = fileName => {
  //   setFiles(files.filter(file => file.name !== fileName));
  // };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const filteredAcceptedFiles = acceptedFiles.filter(newFile =>
        files.every(oldFile => oldFile.name !== newFile.name)
      );
      setFiles([...files, ...filteredAcceptedFiles]);
      setImageUrls([
        ...imageUrls,
        ...filteredAcceptedFiles.map(file => URL.createObjectURL(file))
      ]);
    }
  });

  const thumbs = imageUrls.map(image => (
    <div key={image}>
      <img src={image} alt={image} />

      {/* {editMode && (
        <button type="button" onClick={() => handleDeleteImage(file.name)}>
          <ClearIcon />
        </button>
      )} */}
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
            onClick={() => {
              setFiles([]);
              setImageUrls([]);
            }}
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
