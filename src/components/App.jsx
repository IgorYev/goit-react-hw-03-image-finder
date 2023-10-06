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
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      fetchImages(query, page).then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalImages: data.totalHits,
        }));
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
    } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSubmit} query={query} />
        {loading ? (
          <Audio
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        ) : (
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
      </div>
    );
  }
}

export default App;
