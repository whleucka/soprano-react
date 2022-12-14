import { useContext } from 'react';
import { Trash as TrashIcon } from 'react-feather';
import { SopranoContext } from './Soprano';

const PlaylistActions = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const handleClear = () => {
        dispatch({ type: 'setPlaylist', payload: [] });
        dispatch({ type: 'setPlaylistIndex', payload: 0 });
    };
    return (
        <div className="actions" id="playlist-actions">
            {state.playlist.length > 0 && (
                <button onClick={handleClear} className="btn btn-sm btn-dark">
                    <TrashIcon className="me-1" size="14" /> Clear
                </button>
            )}
        </div>
    );
};

export default PlaylistActions;
