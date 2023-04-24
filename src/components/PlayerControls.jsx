import { useContext } from 'react';
import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Shuffle,
    Repeat
} from 'react-feather';
import { SopranoContext } from './Soprano';

const PlayerControls = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const handleNext = () => {
        dispatch({ type: 'setStatus', payload: 'next' });
    };
    const handlePrev = () => {
        dispatch({ type: 'setStatus', payload: 'prev' });
    };
    const handlePlayPause = () => {
        if (state.status === 'playing') handlePause();
        else if (state.status === 'paused') handlePlay();
    };
    const handlePlay = () => {
        dispatch({ type: 'setStatus', payload: 'play' });
    };
    const handlePause = () => {
        dispatch({ type: 'setStatus', payload: 'pause' });
    };

    const PlayPauseIcon = state.status === 'paused' ? <Play /> : <Pause />;

    return (
        <section id="player-controls">
            <button className="btn">
                <Shuffle />
            </button>
            <button className="btn" onClick={handlePrev}>
                <SkipBack />
            </button>
            <button className="btn" onClick={handlePlayPause}>
                {PlayPauseIcon}
            </button>
            <button className="btn" onClick={handleNext}>
                <SkipForward />
            </button>
            <button className="btn" onClick={handlePrev}>
                <Repeat />
            </button>
        </section>
    );
};

export default PlayerControls;
