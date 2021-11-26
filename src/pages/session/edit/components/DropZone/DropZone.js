import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'class-names';
import { useDropzone } from 'react-dropzone';
import { FaTrashAlt, FaUpload } from 'react-icons/fa';
import styles from './DropZone.module.scss';

const DropZone = ({ handleSubmit, images }) => {
  const [imageUrls, setImageUrls] = useState(images);
  const [files, setFiles] = useState([]);

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
    <div
      key={image}
      className={styles.thumbnail}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* <img src={image} alt={image} /> */}
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
    <div className={styles.container}>
      <div {...getRootProps()} className={styles.dropZone}>
        <input {...getInputProps()} />
        <p className={styles.dropZone}>
          Drag &apos;n&apos; drop some files here, or click to select files
        </p>
      </div>

      <div className={styles.thumbsContainer}>{thumbs}</div>

      <div className={styles.actionButtons}>
        <button
          type="button"
          disabled={!files.length}
          onClick={() => {
            setFiles([]);
            setImageUrls([]);
          }}
          className={cx(styles.buttonFab, styles.delete)}
        >
          <FaTrashAlt />
        </button>
        <button
          type="button"
          disabled={!files.length}
          onClick={() => {
            handleSubmit(files);
          }}
          className={styles.buttonFab}
        >
          <FaUpload />
        </button>
      </div>
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
