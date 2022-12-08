import { useContext } from 'react';
import PlaylistActions from './PlaylistActions';
import { SopranoContext } from './Soprano';
import TrackRow from './TrackRow';

const PlaylistTracks = () => {
    const { state } = useContext(SopranoContext);
    return (
        <div>
            {state.playlist.length > 0 && (
                <div>
                    <PlaylistActions />
                    {state.playlist.map((track, i) => (
                        <TrackRow key={i} track={track} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlaylistTracks;
