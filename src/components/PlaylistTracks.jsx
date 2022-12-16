import { useContext } from 'react';
import { Info as InfoIcon, Link as LinkIcon } from 'react-feather';
import PlaylistActions from './PlaylistActions';
import { Link } from 'react-router-dom';
import { SopranoContext } from './Soprano';
import TrackRow from './TrackRow';

const PlaylistTracks = () => {
    const { state } = useContext(SopranoContext);
    return (
        <div>
            {state.playlist.length === 0 && (
                <div className="alert alert-secondary my-3" role="alert">
                    <InfoIcon size="14" /> <strong>Playlist is empty...</strong>
                    <br />
                    <br />
                    <Link style={{ color: '#333' }} to="/search">
                        <LinkIcon size="14" /> Click here to search for music
                    </Link>
                </div>
            )}
            {state.playlist.length > 0 && (
                <div>
                    <PlaylistActions />
                    {state.playlist.map((track, i) => (
                        <TrackRow
                            key={i}
                            mode="playlist"
                            track={track}
                            playlistIndex={i}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlaylistTracks;
