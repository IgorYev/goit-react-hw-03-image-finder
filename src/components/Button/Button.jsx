import React from 'react';
import styles from '../styles.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={styles.Button} onClick={onLoadMore}>
      Load More
    </button>
  );
};

export default Button;
