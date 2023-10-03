import { Component } from 'react';
import styles from '../styles.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, alt } = this.props;

    return (
      <div className={styles.Overlay} onClick={this.handleClose}>
        <div className={styles.Modal}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
