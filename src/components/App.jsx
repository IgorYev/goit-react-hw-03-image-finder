import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from '../services/Api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Audio } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import styles from './styles.module.css';

class App extends React.Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalImages: 0,
    loading: false,
    showModal: false,
    selectedImage: '',
    alt: '',
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ loading: true });
      fetchImages(query, page)
        .then(data => {
          if (data.totalHits === 0) {
            return;
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            totalImages: data.totalHits,
          }));
        })
        .catch(() => {
          this.setState({
            error: 'An error occurred while processing the request',
          });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  handleSubmit = query => {
    this.setState({ query, page: 1, images: [], totalImages: 0 });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleImageClick = (largeImageURL, alt) => {
    this.setState({
      showModal: true,
      selectedImage: largeImageURL,
      alt,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      selectedImage: '',
      alt: '',
    });
  };

  render() {
    const {
      images,
      query,
      loading,
      showModal,
      selectedImage,
      alt,
      totalImages,
      error,
    } = this.state;

    const noResultsMessage =
      totalImages === 0 && query.trim() !== '' && !loading ? (
        <p className={styles.NoResults}>
          No results found for your query. 🙁 Please try again.
        </p>
      ) : null;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSubmit} query={query} />
        {loading ? (
          <div className={styles.LoaderContainer}>
            <Audio
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        ) : null}

        {error ? (
          <p className={styles.Error}>
            An error occurred while processing the request
          </p>
        ) : null}

        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleImageClick} />
        )}
        {totalImages !== images.length && (
          <Button onLoadMore={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal
            largeImageURL={selectedImage}
            alt={alt}
            onClose={this.handleCloseModal}
          />
        )}

        {noResultsMessage}
      </div>
    );
  }
}

export default App;
