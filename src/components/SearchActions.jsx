import { useContext } from 'react';
import { Music as MusicIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { SopranoContext } from './Soprano';

const SearchActions = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const navigate = useNavigate();
    const handleClick = (e) => {
        dispatch({ type: 'setPlaylist', payload: state.searchResults });
        dispatch({ type: 'setPlaylistIndex', payload: 0 });
        dispatch({ type: 'setSearchResults', payload: [] });
        navigate('/playlist');
    };

    return (
        <div className="actions" id="search-actions">
            <button onClick={handleClick} className="btn btn-sm btn-dark">
                <MusicIcon className="me-1" size="14" /> Playlist
            </button>
        </div>
    );
};

export default SearchActions;
