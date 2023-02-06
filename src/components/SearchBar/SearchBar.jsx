import Notiflix from 'notiflix';

import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e.currentTarget.query.value);
    if (e.currentTarget.elements.query.value === '') {
      Notiflix.Notify.failure('Please, enter your query.');

      return;
    }
    e.target.reset();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          name="query"
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;
