import { useState, useContext } from 'react';
import { Search as SearchIcon, Trash as TrashIcon } from 'react-feather';
import { SopranoContext } from './Soprano';
import { BarLoader } from 'react-spinners';
import { Info as InfoIcon } from 'react-feather';
import API from './API';

const MusicSearch = ({ searchRef }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { state, dispatch } = useContext(SopranoContext);
    const [noResults, setNoResults] = useState(false);
    const [searching, setSearching] = useState(false);

    const handleChange = (e) => {
        const term = e.currentTarget.value;
        setNoResults(false);
        setSearchTerm(term);
    };

    const handleKey = (e) => {
        if (e.defaultPrevented) {
            return;
        }
        if (e.keyCode === 13) {
            handleSubmit();
        } else if (e.keyCode === 27) {
            handleClear();
        }
    };

    const handleSubmit = () => {
        // Make some request to api
        setSearching(true);
        if (searchTerm.trim().length > 0) {
            dispatch({ type: 'setStatus', payload: 'search' });
            dispatch({ type: 'setSearchResults', payload: [] });
            API.musicSearch(searchTerm.trim())
                .then((tracks) => {
                    if (tracks.length > 0) {
                        dispatch({ type: 'setSearchResults', payload: tracks });
                        setSearchTerm('');
                    } else {
                        setNoResults(true);
                    }
                    setSearching(false);
                })
                .catch((err) => {
                    console.log(err);
                    setSearching(false);
                });
        }
    };

    const handleClear = () => {
        dispatch({ type: 'setSearchResults', payload: [] });
        setSearchTerm('');
        setNoResults(false);
        setSearching(false);
    };

    return (
        <div id="music-search-module">
            <div id="music-search" className="input-group input-group-sm w-100">
                <input
                    ref={searchRef}
                    placeholder="I want to listen to..."
                    type="search"
                    onChange={handleChange}
                    onKeyUp={handleKey}
                    value={searchTerm}
                    className="form-control form-control-sm bg-dark"
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-sm btn-dark"
                >
                    <SearchIcon height="14" />
                </button>
                {(state.searchResults.length > 0 || searchTerm.length > 0) && (
                    <button
                        type="submit"
                        onClick={handleClear}
                        style={{ borderLeft: 0 }}
                        className="btn btn-sm btn-dark"
                    >
                        <TrashIcon height="14" />
                    </button>
                )}
            </div>

            {noResults && (
                <div className="alert alert-secondary mt-2" role="alert">
                    <InfoIcon size="14" /> No results found for "
                    <strong>{searchTerm}</strong>"
                </div>
            )}

            {searching && (
                <BarLoader className="mt-3" color="#36d7b7" width="100%" />
            )}
        </div>
    );
};

export default MusicSearch;
