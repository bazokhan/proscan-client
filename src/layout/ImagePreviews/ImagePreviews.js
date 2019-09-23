import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import styles from './ImagePreviews.module.scss';

const ImagePreviews = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const nextImage = () => {
    setImageIndex(Math.min(imageIndex + 1, images.length - 1));
  };
  const prevImage = () => {
    setImageIndex(Math.max(imageIndex - 1, 0));
  };
  return (
    <div className={styles.container}>
      <div className={styles.actionBar}>
        <button type="button" onClick={prevImage} className={styles.right}>
          <FaArrowCircleRight />
        </button>
        <button type="button" onClick={nextImage} className={styles.left}>
          <FaArrowCircleLeft />
        </button>
      </div>
      <div className={styles.image}>
        <img src={images[imageIndex]} alt={images[imageIndex]} />
      </div>
    </div>
  );
};

ImagePreviews.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImagePreviews;
