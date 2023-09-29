import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';
import AlbumCover from './AlbumCover';
import VolumeProgress from './VolumeProgress';
import PlayerControls from './PlayerControls';

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
                className="d-flex justify-content-center align-items-center flex-grow-1"
            >
                <PlayerControls audioRef={audioRef} />
            </div>
            <div id="volume" className="d-flex align-items-center">
                <VolumeProgress />
            </div>
        </section>
    );
};

export default Player;
