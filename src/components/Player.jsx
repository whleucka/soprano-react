import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import PlayerControls from './PlayerControls';
import PlayerVolume from './PlayerVolume';
import TrackTitle from './TrackTitle';
import AlbumCover from './AlbumCover';
import PlayerProgress from './PlayerProgress';
import Audio from './Audio';

const Player = () => {
    const { state } = useContext(SopranoContext);
    const cover = Object.keys(state.track).length > 0 ? state.track.cover : '/img/no-album.png';
    const title = Object.keys(state.track).length > 0 ? state.track.title : null;
    const artist = Object.keys(state.track).length > 0 ? state.track.artist : null;
    return (
        <>
            <PlayerProgress />
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
                <Audio />
            </section>
        </>
    );
};

export default Player;
