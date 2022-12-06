import { useState, useContext } from 'react';
import { Search as SearchIcon, Trash as TrashIcon } from 'react-feather';
import { SopranoContext } from './Soprano';
import API from './API';

const MusicSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { dispatch } = useContext(SopranoContext);

    const handleChange = (e) => {
        const term = e.currentTarget.value.trim();
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
        if (searchTerm) {
            API.musicSearch(searchTerm).then((tracks) => {
                dispatch({ type: 'setSearchResults', payload: tracks });
            });
        }
    };

    const handleClear = () => {
        // Make some request to api
        if (searchTerm) {
            dispatch({ type: 'setSearchResults', payload: [] });
            setSearchTerm("");
        }
    };

    return (
        <div id="music-search">
            <input
                placeholder="I want to listen to..."
                type="search"
                onChange={handleChange}
                onKeyUp={handleKey}
                value={searchTerm}
                className="form-control form-control-sm"
            />
            <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
            >
                <SearchIcon height="14" />
            </button>
            { searchTerm.length > 0 &&
            <button
                type="submit"
                onClick={handleClear}
                style={{borderLeft: 0}}
                className="btn btn-primary"
            >
                <TrashIcon height="14" />
            </button>
            }
        </div>
    );
};

export default MusicSearch;
