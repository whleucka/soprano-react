import { useContext, useEffect } from 'react';
import { Info } from 'react-feather';
import { SopranoContext } from './Soprano';
import TrackRow from './TrackRow';

const Playlist = () => {
    const { dispatch, state } = useContext(SopranoContext);

    useEffect(() => {
        const track = state.playlist[state.playlistIndex];
        if (track) {
            dispatch({ type: 'setTrack', payload: track });
        }
    }, [state.playlistIndex]);

    return (
        <>
            <h2 className="header">Playlist</h2>
            {state.playlist.length === 0 && (
                <div className="alert alert-secondary my-3" role="alert">
                    <Info size="14" /> Playlist is empty...
                </div>
            )}
            {state.playlist.length > 0 &&
                state.playlist.map((track, i) => (
                    <TrackRow key={i} playlistIndex={i} track={track} />
                ))}
        </>
    );
};

export default Playlist;
