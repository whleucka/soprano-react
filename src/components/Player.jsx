import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import PlayerControls from './PlayerControls';
import PlayerVolume from './PlayerVolume';
import TrackTitle from './TrackTitle';
import AlbumCover from './AlbumCover';

const Player = () => {
    const { state } = useContext(SopranoContext);
    const cover = state.track
        ? state.track.cover
        : null;
    const title = state.track
        ? state.track.title
        : null;
    const artist = state.track
        ? state.track.artist
        : null;
    return (
        <section id="player">
            <div className="d-flex align-items-center justify-content-center h-100 w-100 ">
                <div id="left-cover">
                    <AlbumCover cover={cover} />
                </div>
                <div id="left-track-title">
                    <TrackTitle artist={artist} title={title} />
                </div>
                <div id="center-controls" className="flex-grow-1">
                    <PlayerControls />
                </div>
                <div id="right-volume">
                    <PlayerVolume />
                </div>
            </div>
        </section>
    );
};

export default Player;
