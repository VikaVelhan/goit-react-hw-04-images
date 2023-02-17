import { useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRef = document.querySelector('#modal-root');

export default function Modal({ largeImg, onClose }) {
  useState(() => {
    const onCloseByEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onCloseByEsc);
    return () => {
      window.removeEventListener('keydown', onCloseByEsc);
    };
  }, [onClose]);

  const onCloseBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={onCloseBackdropClick}>
      <div className={css.Modal}>
        <img src={largeImg} alt="" />
      </div>
    </div>,
    modalRef
  );
}
