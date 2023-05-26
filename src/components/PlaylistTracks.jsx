import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import TrackRows from './TrackRows';

const PlaylistTracks = () => {
    const { state } = useContext(SopranoContext);
    return <TrackRows tracks={state.music.playlist.tracks} mode="playlist" />;
};

export default PlaylistTracks;
