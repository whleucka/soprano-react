import { useState, useEffect, useContext } from 'react';
import { SopranoContext } from './Soprano';
//import { Util } from './Util';

var playbackTimer = null;
//var playtimeTimer = null;

const PlayerProgress = ({ audioRef }) => {
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
        //clearInterval(playtimeTimer);
        if (reset_progress) {
            setPlayback(0);
            setBuffer(0);
            //setPlaytime('00:00');
        }
    };

    const updatePositionState = () => {
        if ('setPositionState' in navigator.mediaSession) {
            navigator.mediaSession.setPositionState({
                duration: parseFloat(audioRef.current.duration),
                playbackRate: audioRef.current.playbackRate,
                position: audioRef.current.currentTime
            });
        }
    };

    const startPlayback = (seconds) => {
        const delay = 250;
        playbackTimer = setInterval(() => {
            if (!audioRef.current.paused) {
                const currTime = parseFloat(audioRef.current.currentTime);
                const end = parseFloat(seconds);
                const pct = ((currTime / end) * 100).toFixed(2);
                const buffered = audioRef.current.buffered;
                const loaded =
                    audioRef.current.duration > 0
                        ? (
                              (buffered.end(
                                  audioRef.current.buffered.length - 1
                              ) /
                                  audioRef.current.duration) *
                              100
                          ).toFixed(2)
                        : 0;
                setPlayback(pct);
                setBuffer(loaded - pct);
            }
        }, delay);
    };

    // const startPlaytime = () => {
    //     const delay = 1000;
    //     playtimeTimer = setInterval(() => {
    //         if (!audioRef.current.paused) {
    //             const elapsed = audioRef.current.currentTime;
    //             const elapsed_string = Util.convertSeconds(elapsed);
    //             setPlaytime(elapsed_string);
    //         }
    //     }, delay);
    // };
    //

    const handleClick = (e) => {
        if (!state.track || state.mode === 'radio' || !audioRef.current.src)
            return;
        setBuffer(0);
        const self = e.currentTarget;
        const width = document
            .querySelector('#player-progress')
            .getBoundingClientRect().width;
        const x = e.pageX - self.offsetLeft;
        const pct = width > 0 ? x / width : 0;
        const seconds = state.track.playtime_seconds;
        const new_seconds = pct.toFixed(2) * seconds;
        audioRef.current.currentTime = new_seconds;
        setPlayback((pct * 100).toFixed(2));
        updatePositionState();
    };

    useEffect(() => {
        if (Object.keys(state.track).length > 0) {
            clearTimer();
            setTimer(state.track.playtime_seconds);

            if (state.mode === 'radio') {
                setPlayback(100);
            }
        }
    }, [state.track]);

    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, []);

    const progressClass =
        audioRef.current && audioRef.current.paused ? 'bg-secondary' : '';

    return (
        <div id="progress-cont">
            <div
                id="player-progress"
                className="progress"
                onClick={handleClick}
            >
                <div
                    id="player-progressbar"
                    className={'progress-bar ' + progressClass}
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
