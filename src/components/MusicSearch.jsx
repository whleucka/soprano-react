import { useState, useContext } from 'react';
import { Search as SearchIcon, Trash as TrashIcon } from 'react-feather';
import { SopranoContext } from './Soprano';
import API from './API';

const MusicSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { state, dispatch } = useContext(SopranoContext);

    const handleChange = (e) => {
        const term = e.currentTarget.value;
        setSearchTerm(term);
    };

    const handleKey = (e) => {
        if (e.defaultPrevented) {
            return;
        }
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        // Make some request to api
        if (searchTerm.trim().length > 0) {
            dispatch({ type: 'setSearchResults', payload: [] });
            API.musicSearch(searchTerm.trim()).then((tracks) => {
                dispatch({ type: 'setSearchResults', payload: tracks });
            });
        }
    };

    const handleClear = () => {
        dispatch({ type: 'setSearchResults', payload: [] });
        setSearchTerm('');
    };

    return (
        <div id="music-search" className="input-group input-group-sm w-100">
            <input
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
            {state.searchResults.length > 0 && (
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
    );
};

export default MusicSearch;
