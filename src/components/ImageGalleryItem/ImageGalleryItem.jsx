//import { Component } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../Modal/Modal';

import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { webformatURL, largeImageURL } = image;
  return (
    <>
      <li onClick={handleToggleModal} className={css.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt="img"
          className={css.ImageGalleryItemImage}
        />
      </li>
      {isModalOpen && (
        <Modal onClose={handleToggleModal} largeImg={largeImageURL} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};
