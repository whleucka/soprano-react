import { useContext, useEffect } from 'react';
import PlaylistTracks from './PlaylistTracks';
import PlaylistActions from './PlaylistActions';
import { SopranoContext } from './Soprano';
import { Info as InfoIcon, Link as LinkIcon } from 'react-feather';
import { Link } from 'react-router-dom';

const Playlist = () => {
    const { state } = useContext(SopranoContext);

    useEffect(() => {
        if (state.music.playlist.tracks.length > 0) {
            const track =
                state.music.playlist.tracks[state.music.playlist.index];
            if (track) {
                const trackRow = document.getElementById(
                    'track-row-' + state.music.playlist.index
                );
                if (trackRow) {
                    trackRow.focus();
                }
            }
        }
    }, [state.music.playlist.index, state.music.playlist.tracks]);

    return (
        <>
            <h2 className="header">Playlist</h2>
            {state.music.playlist.tracks.length === 0 && (
                <div className="alert alert-secondary my-3" role="alert">
                    <InfoIcon size="14" /> <strong>Playlist is empty...</strong>
                    <br />
                    <br />
                    <Link style={{ color: '#333' }} to="/search">
                        <LinkIcon size="14" /> Click here to search for music
                    </Link>
                </div>
            )}
            {state.music.playlist.tracks.length > 0 && <PlaylistActions />}
            <PlaylistTracks />
        </>
    );
};

export default Playlist;
