import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';
import { fetchImages } from '..//service/fetchImages';
import { useEffect, useState } from 'react';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchImages(query, page)
      .then(resp => {
        setImages(images =>
          page === 1 ? [...resp.hits] : [...images, ...resp.hits]
        );
        setTotalImages(resp.totalHits);
      })
      .catch(error => {
        console.log(error);
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);

    if (query !== '') {
      setIsLoading(true);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  const renderButtonOrLoader = () => {
    return isLoading ? (
      <Loader />
    ) : (
      images.length !== 0 && images.length < totalImages && (
        <Button onClick={handleLoadMore} />
      )
    );
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {renderButtonOrLoader()}
    </div>
  );
}
