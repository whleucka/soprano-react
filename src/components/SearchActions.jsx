import { useContext } from 'react';
import { Music as MusicIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { SopranoContext } from './Soprano';

const SearchActions = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const navigate = useNavigate();
    const setPlaylist = () => {
        dispatch({ type: 'setPlaylist', payload: state.music.search.results });
        dispatch({ type: 'setPlaylistIndex', payload: 0 });
        navigate('/');
    };

    return (
        <div className="actions" id="search-actions">
            <button onClick={setPlaylist} className="btn btn-sm btn-dark">
                <MusicIcon className="me-1" size="14" /> Play all
            </button>
        </div>
    );
};

export default SearchActions;
