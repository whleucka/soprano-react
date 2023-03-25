import { useContext } from 'react';
import { Music as MusicIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { SopranoContext } from './Soprano';

const SearchActions = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const navigate = useNavigate();
    const mergeResults = () => {
        dispatch({ type: 'mergePlaylist', payload: state.searchResults });
        dispatch({ type: 'setPlaylistIndex', payload: 0 });
        dispatch({ type: 'setPlaylistId', payload: null });
    };

    const viewPlaylist = () => {
        navigate('/playlist');
    }

    return (
        <div className="actions" id="search-actions">
            <button onClick={mergeResults} className="btn btn-sm btn-dark">
                <MusicIcon className="me-1" size="14" /> Play all
            </button>
            { state.playlist.length > 0 &&
                <button onClick={viewPlaylist} className="btn btn-sm btn-dark">
                    <MusicIcon className="me-1" size="14" /> Playlist
                </button>
            }
        </div>
    );
};

export default SearchActions;
