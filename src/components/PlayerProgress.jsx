import { useState, useEffect, useContext } from 'react';
import { SopranoContext } from './Soprano';
//import { Util } from './Util';

var playbackTimer = null;
var playtimeTimer = null;

const PlayerProgress = () => {
    const { state } = useContext(SopranoContext);
    //const [playtime, setPlaytime] = useState('00:00');
    const [playback, setPlayback] = useState(0);
    const [buffer, setBuffer] = useState(0);

    // const playtimeSeconds =
    //         'playtime_seconds' in state.track
    //         ? Util.convertSeconds(state.track.playtime_seconds)
    //         : '00:00';

    const setTimer = (seconds) => {
        if (seconds > 0) {
            startPlayback(seconds);
            //startPlaytime(seconds);
        }
    };

    const clearTimer = (reset_progress = true) => {
        clearInterval(playbackTimer);
        clearInterval(playtimeTimer);
        if (reset_progress) {
            setPlayback(0);
            setBuffer(0);
            //setPlaytime('00:00');
        }
    };

    const updatePositionState = () => {
        const audio = document.getElementById('audio');
        if ('setPositionState' in navigator.mediaSession) {
            navigator.mediaSession.setPositionState({
                duration: audio.duration,
                playbackRate: audio.playbackRate,
                position: audio.currentTime
            });
        }
    };

    const startPlayback = (seconds) => {
        const audio = document.getElementById('audio');
        const delay = 250;
        playbackTimer = setInterval(() => {
            if (!audio.paused) {
                const currTime = parseFloat(audio.currentTime);
                const end = parseFloat(seconds);
                const pct = ((currTime / end) * 100).toFixed(2);
                const buffered = audio.buffered;
                const loaded = (
                    (buffered.end(audio.buffered.length - 1) / audio.duration) *
                    100
                ).toFixed(2);
                setPlayback(pct);
                setBuffer(loaded - pct);
            }
        }, delay);
    };

    // const startPlaytime = () => {
    //     const audio = document.getElementById('audio');
    //     const delay = 1000;
    //     playtimeTimer = setInterval(() => {
    //         if (!audio.paused) {
    //             const elapsed = audio.currentTime;
    //             const elapsed_string = Util.convertSeconds(elapsed);
    //             setPlaytime(elapsed_string);
    //         }
    //     }, delay);
    // };

    useEffect(() => {
        clearTimer();
        setTimer(state.track.playtime_seconds);
    }, [state.track]);

    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, []);

    return (
        <div id="progress-cont">
            <div
                id="player-progress"
                className="progress"
            >
                <div
                    id="player-progressbar"
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: playback + '%' }}
                ></div>
                <div
                    id="loaded-progressbar"
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: buffer + '%' }}
                ></div>
            </div>
        </div>
    );
};

export default PlayerProgress;