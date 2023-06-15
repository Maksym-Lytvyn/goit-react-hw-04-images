import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import ImageGalleryCSS from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ imageResults, onOpenModal}) => {

    return (
      <>
        <ul className={ImageGalleryCSS.ImageGallery}>
          {imageResults.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onOpenModal={onOpenModal}
            />
          ))}
        </ul>
      </>
    );
  }

ImageGallery.propTypes = {
  imagesResults: PropTypes.arrayOf(PropTypes.object),
  onOpenModal: PropTypes.func.isRequired,
};
export default ImageGallery;
