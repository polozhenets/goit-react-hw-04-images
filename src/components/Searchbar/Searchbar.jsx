import { useState } from 'react';
import PropTypes from 'prop-types';
const Searchbar  =({onSearch})=> {

  const [query,setQuery] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    if (query==="") return;
    onSearch(query);
    resetForm();
  };

  const resetForm = () => {
   setQuery("");
  };


    return (
      <header className="Searchbar" onSubmit={submitHandler}>
        <form className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={query}
            onChange={e=>setQuery(e.target.value)}
          />
        </form>
      </header>
    );
  }


Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};


export default Searchbar;
