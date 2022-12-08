import { useContext } from "react";
import { SopranoContext } from './Soprano';

const PlaylistActions = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const handleClear = (e) => {
        dispatch({ type: 'setPlaylist', payload: [] });
        dispatch({ type: 'setPlaylistIndex', payload: 0 });
    };
    return (
        <div className="actions" id="playlist-actions">
            { state.playlist.length > 0 &&
                <button onClick={handleClear} className="btn btn-sm btn-dark">Clear</button>
            }
        </div>
    );
};

export default PlaylistActions;
