import React from 'react';
import styles from '../styles.module.css';

class Searchbar extends React.Component {
  state = {
    query: '',
  };
  handleSubmit = event => {
    event.preventDefault();
    const query = this.state.query.trim().toLowerCase();
    if (!query) return;
    this.props.onSubmit(query);
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles['SearchForm-button']}>
            <span className={styles['SearchForm-button-icon']}></span>
            <span className={styles['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={styles['SearchForm-input']}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
