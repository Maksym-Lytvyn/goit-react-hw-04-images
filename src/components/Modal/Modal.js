import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ModalCSS from './Modal.module.css';

const Modal = ({largeImageURL, onClose}) => {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  useEffect(() => {
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    document.getElementById('root').classList.remove('no-scroll');
  };
}, [onClose]);

  const handleCloseClick = () => {
    onClose();
  };

  const handleImageClick = e => {
    e.stopPropagation();
  };


    return (
      <div onClick={handleCloseClick} className={ModalCSS.overlay}>
        <div className={ModalCSS.wrapper}>
          <img
            src={largeImageURL}
            alt="Modal"
            className={ModalCSS.image}
            onClick={handleImageClick}
          />
        </div>
      </div>
    );
  }

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
