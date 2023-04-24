import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import MD5Cover from './MD5Cover';
import VolumeProgress from './VolumeProgress';
import PlayerControls from './PlayerControls';

const Player = () => {
    const { state } = useContext(SopranoContext);
    const cover = state.track ? (
        <MD5Cover md5={state.track?.md5} size={[80, 80]} />
    ) : (
        <img src="/img/no-album.png" width="80" height="80" />
    );

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
