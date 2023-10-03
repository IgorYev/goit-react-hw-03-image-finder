import React from 'react';
import styles from '../styles.module.css';

const Button = ({ onLoadMore, hasMore }) => {
  return (
    <button type="button" className={styles.Button} onClick={onLoadMore}>
      {hasMore ? 'Load more' : 'No more images'}
    </button>
  );
};

export default Button;
