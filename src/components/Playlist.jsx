import { useContext, useEffect } from 'react';
import PlaylistTracks from './PlaylistTracks';
import { SopranoContext } from './Soprano';

const Playlist = () => {
    const { state, dispatch } = useContext(SopranoContext);
    useEffect(() => {
        if (state.playlist.length > 0) {
            const track = state.playlist[state.playlistIndex];
            if (track) {
                const playlistRow = document.getElementById(
                    'playlist-row-' + state.playlistIndex
                );
                if (playlistRow) {
                    playlistRow.focus();
                }
            }
        }
    }, []);
    return (
        <>
            <h2 className="header">Playlist</h2>
            <PlaylistTracks />
        </>
    );
};

export default Playlist;
