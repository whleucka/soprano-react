import PlayerCover from './PlayerCover';
import PlayerControls from './PlayerControls';
import PlayerVolume from './PlayerVolume';

const Player = () => {
    return (
        <section id="player">
            <div className="row h-100 w-100">
                <div id="left" className="col">
                    <PlayerCover />
                </div>
                <div id="center" className="col">
                    <PlayerControls />
                </div>
                <div id="right" className="col">
                    <PlayerVolume />
                </div>
            </div>
        </section>
    );
};

export default Player;
