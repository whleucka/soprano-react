import { useContext } from 'react';
import { Info } from 'react-feather';
import PlaylistTracks from './PlaylistTracks';
import { SopranoContext } from './Soprano';

const Playlist = () => {
    const { state } = useContext(SopranoContext);

    return (
        <>
            <h2 className="header">Playlist</h2>
            {state.playlist.length === 0 && (
                <div className="alert alert-secondary my-3" role="alert">
                    <Info size="14" /> Playlist is empty...
                </div>
            )}
            <PlaylistTracks />
        </>
    );
};

export default Playlist;
