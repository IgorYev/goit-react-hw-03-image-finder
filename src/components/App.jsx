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
    hasMoreImages: true,
    loading: false,
    showModal: false,
    selectedImage: '',
    alt: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = () => {
    const { query } = this.state;

    fetchImages(query, 1).then(images => {
      this.setState({ images, page: 1, hasMoreImages: true });
    });
  };

  handleLoadMore = () => {
    const { query, page, images } = this.state;

    fetchImages(query, page + 1).then(newImages => {
      if (newImages.length > 0) {
        const newImageIds = new Set(newImages.map(image => image.id));
        const updatedImages = images
          .filter(image => !newImageIds.has(image.id))
          .concat(newImages);

        this.setState(prevState => ({
          images: updatedImages,
          page: prevState.page + 1,
        }));
      } else {
        this.setState({ hasMoreImages: false });
      }
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
      hasMoreImages,
      loading,
      showModal,
      selectedImage,
      alt,
    } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar
          onSubmit={this.handleSubmit}
          query={query}
          onChange={this.handleChange}
        />
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
        {hasMoreImages && (
          <Button onLoadMore={this.handleLoadMore} hasMore={hasMoreImages} />
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
