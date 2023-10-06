import React from 'react';
import styles from '../styles.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles['ImageGalleryItem-image']}
        src={image.webformatURL}
        alt={`Pixabay ${image.id}`}
        onClick={() => onClick(image.largeImageURL, image.tags)}
      />
    </li>
  );
};

export default ImageGalleryItem;
