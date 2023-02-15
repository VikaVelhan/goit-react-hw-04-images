import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRef = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEsc);
  }
  onCloseByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImg } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.onCloseBackdropClick}>
        <div className={css.Modal}>
          <img src={largeImg} alt="" />
        </div>
      </div>,
      modalRef
    );
  }
}
export default Modal;
