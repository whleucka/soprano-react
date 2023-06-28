import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import AlbumCover from './AlbumCover';
import VolumeProgress from './VolumeProgress';
import PlayerControls from './PlayerControls';

const Player = () => {
    const { state } = useContext(SopranoContext);
    const cover_src = state.track ? state.track.cover : '/img/no-album.png';
    const cover = <AlbumCover cover={cover_src} />;

    return (
        <section id="player" className="d-flex">
            <div
                id="cover"
                className="d-flex justify-content-center align-items-center"
            >
                {cover}
            </div>
            <div
                id="controls"
                className="d-flex justify-content-center align-items-center flex-grow-1"
            >
                <PlayerControls />
            </div>
            <div id="volume" className="d-flex align-items-center">
                <VolumeProgress />
            </div>
        </section>
    );
};

export default Player;
