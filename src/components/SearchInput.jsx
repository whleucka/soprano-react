import { useContext } from 'react';
import { Search as SearchIcon, Trash as TrashIcon } from 'react-feather';
import API from './API';
import { SopranoContext } from './Soprano';

const SearchInput = () => {
    const { state, dispatch } = useContext(SopranoContext);

    const handleInput = (e) => {
        const term = e.currentTarget.value;
        dispatch({ type: 'setMusicSearchTerm', payload: term });
    };

    const handleKey = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        } else if (e.keyCode === 27) {
            handleClear();
        }
    };

    const handleTypeChange = (e) => {
        const type = e.currentTarget.value;
        dispatch({ type: 'setMusicSearchType', payload: type });
    };

    const handleSubmit = () => {
        const term = state.music.search.term.trim();
        if (term.length > 0) {
            API.musicSearch(term, state.music.search.type, state.user)
                .then((tracks) => {
                    if (tracks.length > 0) {
                        dispatch({
                            type: 'setMusicSearchResults',
                            payload: tracks
                        });
                    } else {
                        dispatch({ type: 'setMusicSearchResults', payload: [] });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleClear = () => {
        dispatch({ type: 'setMusicSearchResults', payload: [] });
        dispatch({ type: 'setMusicSearchTerm', payload: '' });
    };

    const types = [
        { value: 'title', title: 'Title' },
        { value: 'artist', title: 'Artist' },
        { value: 'album', title: 'Album' },
        { value: 'genre', title: 'Genre' }
    ];

    return (
        <div
            id="music-search"
            className="input-group input-group-sm w-100 mb-2"
        >
            <input
                placeholder="I want to listen to..."
                type="search"
                onInput={handleInput}
                onKeyDown={handleKey}
                value={state.music.search.term}
                className="form-control form-control-sm bg-dark"
            />
            <select
                id="type-select"
                className="form-select bg-dark"
                onChange={handleTypeChange}
                value={state.music.search.type}
            >
                {types.length > 0 &&
                    types.map((type, i) => {
                        return (
                            <option key={i} value={type.value}>
                                {type.title}
                            </option>
                        );
                    })}
            </select>
            <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-sm btn-dark"
            >
                <SearchIcon height="14" />
            </button>
            {(state.music.search.results.length > 0 ||
                state.music.search.term.length > 0) && (
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

export default SearchInput;
