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
    const handleShuffle = () => {
        dispatch({
            type: 'setShuffle',
            payload: !state.music.controls.shuffle
        });
    };
    const handleRepeat = () => {
        dispatch({ type: 'setRepeat', payload: !state.music.controls.repeat });
    };

    const shuffleClass = state.music.controls.shuffle ? 'active' : '';

    const repeatClass = state.music.controls.repeat ? 'active' : '';

    const playPauseIcon =
        state.status === 'paused' || !state.track ? <Play /> : <Pause />;

    return (
        <section id="player-controls" className="d-flex justify-content-center">
            <button
                className={shuffleClass + ' btn text-secondary'}
                onClick={handleShuffle}
            >
                <Shuffle />
            </button>
            <button className="btn text-secondary" onClick={handlePrev}>
                <SkipBack />
            </button>
            <button className={'btn text-secondary'} onClick={handlePlayPause}>
                {playPauseIcon}
            </button>
            <button className="btn text-secondary" onClick={handleNext}>
                <SkipForward />
            </button>
            <button
                className={repeatClass + ' btn text-secondary'}
                onClick={handleRepeat}
            >
                <Repeat />
            </button>
        </section>
    );
};

export default PlayerControls;
