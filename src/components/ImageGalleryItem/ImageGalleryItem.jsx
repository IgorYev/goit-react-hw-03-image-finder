import React from 'react';
import styles from '../styles.module.css';

const ImageGalleryItem = ({ image }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles['ImageGalleryItem-image']}
        src={image.webformatURL}
        alt={`Pixabay ${image.id}`}
      />
    </li>
  );
};

export default ImageGalleryItem;
