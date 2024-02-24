import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';
import AlbumCover from './AlbumCover';
import VolumeProgress from './VolumeProgress';
import PlayerControls from './PlayerControls';
import PlayerProgress from './PlayerProgress';

const Player = (props) => {
    const { audioRef } = props;
    const { state } = useContext(SopranoContext);
    const cover_src = state.track ? state.track.cover : '/img/no-album.png';
    const cover = <AlbumCover cover={cover_src} />;

    return (
        <section id="player" className="d-flex">
            <div
                id="cover"
                className="d-flex justify-content-center align-items-center"
                title = {state.track?.artist + " - " + state.track?.title}
            >
                {cover}
            </div>
            <div
                id="controls"
                className="d-flex flex-column justify-content-center align-items-center flex-grow-1"
            >
                <div id="control-cont" class="w-100 d-flex justify-content-center flex-column">
                <PlayerProgress audioRef={audioRef} />
                <PlayerControls audioRef={audioRef} />
                </div>
            </div>
            <div id="volume" className="d-flex align-items-center">
                <VolumeProgress />
            </div>
        </section>
    );
};

export default Player;
