import { useContext } from 'react';
import API from './API';
import { SopranoContext } from './Soprano';
import { Search as SearchIcon } from 'react-feather';

const SearchInput = () => {
    const { state, dispatch } = useContext(SopranoContext);

    const handleTerm = (term) => {
        // Set the global state search term
        dispatch({ type: 'setMusicSearchTerm', payload: term });
        // Clear the search results when the term is empty
        !term.length && clearResults();
    };

    const clearResults = () => {
        dispatch({
            type: 'setMusicSearchResults',
            payload: []
        });
    };

    const handleEnter = (e) => {
        e.key === 'Enter' && handleSearch();
    };

    const handleSearch = () => {
        // API request to get search results
        if (state.music.search.term.length > 2) {
            API.searchMusic(state.music.search.term).then((tracks) => {
                if (tracks.length > 0) {
                    // TODO: src from the API?
                    // The old API used to do this.
                    // For now, add the src to the track
                    tracks.map((track) => {
                        track.src = `${process.env.REACT_APP_API_URL}/tracks/${track.id}/play`;
                        track.cover = '/img/no-album.png';
                        return track;
                    });
                    dispatch({
                        type: 'setMusicSearchResults',
                        payload: tracks
                    });
                }
            });
        }
    };

    return (
        <div className="input-group input-group-sm mb-3">
            <input
                onKeyDown={(e) => handleEnter(e)}
                type="search"
                value={state.music.search.term}
                onInput={(e) => handleTerm(e.currentTarget.value)}
                className="form-control form-control-sm bg-dark text-light border-0"
                placeholder="What music would you like to hear?"
            />
            <button
                onClick={handleSearch}
                className="btn btn-dark"
                type="button"
            >
                <SearchIcon />
            </button>
        </div>
    );
};

export default SearchInput;
