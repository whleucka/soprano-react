import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import PlayerControls from './PlayerControls';
import PlayerVolume from './PlayerVolume';
import TrackTitle from './TrackTitle';
import AlbumCover from './AlbumCover';
import PlayerProgress from './PlayerProgress';

const Player = ({audioRef}) => {
    const { state } = useContext(SopranoContext);
    const cover =
        Object.keys(state.track).length > 0
            ? state.track.cover
            : '/img/no-album.png';
    const title =
        Object.keys(state.track).length > 0 ? state.track.title : null;
    const artist =
        Object.keys(state.track).length > 0 ? state.track.artist : null;
    return (
        <>
            <PlayerProgress audioRef={audioRef} />
            <section id="player">
                <div className="d-flex align-items-center justify-content-center h-100 w-100 ">
                    <div id="left-cover">
                        <AlbumCover cover={cover} playerCover={true} />
                    </div>
                    <div id="left-track-title">
                        <TrackTitle artist={artist} title={title} />
                    </div>
                    <div id="center-controls" className="flex-grow-1">
                        <PlayerControls audioRef={audioRef} />
                    </div>
                    <div id="right-volume">
                        <PlayerVolume audioRef={audioRef} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Player;
