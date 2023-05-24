import { useContext } from 'react';
import { SopranoContext } from './Soprano';

const SearchInput = () => {
  const { state, dispatch } = useContext(SopranoContext);

  const handleTerm = (term) => {
    // Set the global state search term
    dispatch({ type: 'setSearchTerm', payload: term });
  };

  const handleSearch = () => {
    // API request to get search results
  };

  return (
    <div className="input-group input-group-sm mb-3">
      <input
        type="search"
        value={state.music.search.term}
        onChange={(e) => handleTerm(e.currentTarget.value)}
        className="form-control form-control-sm"
        placeholder="Artist, Album, Title..."
      />
      <button
        onClick={handleSearch}
        className="btn btn-outline-secondary"
        type="button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
