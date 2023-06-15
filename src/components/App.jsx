import PropTypes from 'prop-types';
import axios from 'axios';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import AppCSS from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Error from './Error/Error';
import Blank from './Blank/Blank';

const App = () => {
  // constructor() {
  //   super();
  //   this.state = {
  //     imageResults: [],
  //     onSubmit: '',
  //     isLoading: false,
  //     page: 1,
  //     mounted: true,
  //     focusedImage: null,
  //     error: null,
  //     blank: false,
  //     errorMessage: 'Нажаль за вашим запитом результатів не було знайдено! Спробуйте інший запит'
  //   };
  // }

  // componentDidMount() {
  //   Notiflix.Notify.info('Застосунок запущено!');
  // }
  const [imageResults, setImageResults] = useState([]);
  const [request, setRequest] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(10);
  // const [mounted, setMounted] = useState(true);
  const [focusedImage, setFocusedImage] = useState(null);
  const [error, setError] = useState(false);
  const [blank, setBlank] = useState(false);

  const errorMessage = 'Вибачте, за вашим запитом результатів не знайдено. Спробуйте інший запит';

  const blankMessage = 'Введіть, будь ласка ваш запит';

  useEffect(() => {
    Notiflix.Notify.info('Застосунок запущено!');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (request === '') {
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://pixabay.com/api/?q=${request}&page=${page}&key=35499078-ae1aac6b87ed3c45ca8fde2a7&image_type=photo&orientation=horizontal&per_page=12`
        );

        if (response.data.hits.length === 0) {
          setLoading(false);
          setError(true);
          Notiflix.Notify.failure('Немає результатів!');
        } else if (request === '') {
          setBlank(true);
        } else {
          // this.setState({
          //   imageResults: response.data.hits,
          //   error: false,
          //   blank: false,
          // });
          setImageResults(prevImages => [...prevImages, ...response.data.hits]);
          setError(false);
          setBlank(false);
          Notiflix.Notify.success('Пошук виконано');
        }
      } catch (error) {
        setError(true);
      }

      // this.setState({ isLoading: false });
      setLoading(false);
    };
    fetchData();
  }, [request, page]);

  const handleLoadMore = () => {
    const nextPage = page + 1;

    // const response = await axios.get(
    //   `https://pixabay.com/api/?q=${request}&page=${page}&key=35499078-ae1aac6b87ed3c45ca8fde2a7&image_type=photo&orientation=horizontal&per_page=12`
    // );
    // if (
    //   response.data.hits.length === 0 &&
    //   response.data.hits.length.length <= 12
    // ) {
    // this.setState({ isLoading: false });
    setLoading(false);

    //   return;
    // }
    // if (imageResults !== prevState.imageResults) {
    //   this.setState(prevState => ({
    //     imageResults: [...prevState.imageResults, ...response.data.hits],
    //     page: nextPage,
    //   }));
    //   Notiflix.Notify.success('Завантажено додаткові результати за запитом!');
    // }
    // setImageResults(imageResults => ([...imageResults, ...response.data.hits]));
    setPage(nextPage);

    // this.setState({ isLoading: false });
    setLoading(false);
  };

  const handleSearchSubmit = request => {
    setImageResults([]);
    setPage(1);
    setRequest(request);
  };

  const handleOpenModal = focusedImage => {
    // this.setState({ focusedImage });
    setFocusedImage(focusedImage);
  };

  const handleCloseModal = () => {
    // this.setState({ focusedImage: null });
    setFocusedImage(null);
  };

  const isShowButton =
    imageResults.length > 0 &&
    !isLoading &&
    imageResults.length >= 12 &&
    imageResults.length % 12 === 0 &&
    blank === false;

  return (
    <div className={AppCSS.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      {isLoading === true && <Loader isLoading={isLoading} />}
      {request === null || request === '' ? (
        <Blank blankMessage={blankMessage} />
      ) : (
        <ImageGallery
          imageResults={imageResults}
          onOpenModal={handleOpenModal}
        />
      )}
      {error === true && <Error error={errorMessage} />}
      {isShowButton && <Button onClick={handleLoadMore} />}
      {focusedImage && (
        <Modal
          largeImageURL={focusedImage.largeImageURL}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

App.propTypes = {
  imageResults: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
  request: PropTypes.string,
  isLoading: PropTypes.bool,
  focusedImage: PropTypes.object,
};

export default App;
