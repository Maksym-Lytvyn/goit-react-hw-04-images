import SearchbarCSS from './Searchbar.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

 const Searchbar = ({ onSubmit }) => {
  const [request, setRequest] = useState('');

  const handleChange = event => {
    // this.setState({ onSubmit: event.currentTarget.value.toLowerCase() });
    setRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    // this.props.onSubmit(this.state.onSubmit);
    // this.setState({ onSubmit: '' });
    onSubmit(request);
    setRequest('');
  };

    return (
      <form onSubmit={handleSubmit} className={SearchbarCSS.SearchForm}>
        <button type="submit" className={SearchbarCSS.SearchForm_button}>
          Шукати
        </button>

        <input
          name="query"
          type="text"
          className={SearchbarCSS.SearchForm_input}
          autoComplete="off"
          autoFocus
          placeholder="Пошук фотографій та зображень..."
          value={request}
          onChange={handleChange}
        />
      </form>
    );
  }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
