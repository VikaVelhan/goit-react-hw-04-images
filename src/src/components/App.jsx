import { React, Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';
import { fetchImages } from '..//service/fetchImages';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    totalImages: 0,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      fetchImages(query, page)
        .then(resp => {
          this.setState(({ images }) => ({
            images: page === 1 ? [...resp.hits] : [...images, ...resp.hits],
            totalImages: resp.totalHits,
          }));
        })
        .catch(error => {
          console.log(error);
          return Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSubmit = query => {
    this.setState({ query, page: 1, images: [] });
    if (this.state.query !== '') {
      this.setState({ isLoading: true });
    }
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1, isLoading: true }));
  };

  renderButtonOrLoader = () => {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      this.state.images.length !== 0 &&
        this.state.images.length < this.state.totalImages && (
          <Button onClick={this.handleLoadMore} />
        )
    );
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.renderButtonOrLoader()}
      </div>
    );
  }
}
