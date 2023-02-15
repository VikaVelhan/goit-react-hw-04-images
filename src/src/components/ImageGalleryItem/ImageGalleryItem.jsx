import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handleToggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };
  render() {
    const { webformatURL, largeImageURL } = this.props.image;
    const { isModalOpen } = this.state;
    return (
      <>
        <li onClick={this.handleToggleModal} className={css.ImageGalleryItem}>
          <img
            src={webformatURL}
            alt="img"
            className={css.ImageGalleryItemImage}
          />
        </li>
        {isModalOpen && (
          <Modal onClose={this.handleToggleModal} largeImg={largeImageURL} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};

export default ImageGalleryItem;
