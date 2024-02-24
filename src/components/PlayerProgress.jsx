import { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { SopranoContext } from './Soprano';
import { FastAverageColor } from 'fast-average-color';

var playbackTimer = null;

const PlayerProgress = ({ audioRef }) => {
    const { state } = useContext(SopranoContext);
    const [playback, setPlayback] = useState(0);
    const [buffer, setBuffer] = useState(0);
    const playerProgressRef = useRef(null);
    const playerProgressbarRef = useRef(null);

    const startPlayback = useCallback(
        (seconds) => {
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
        },
        [audioRef]
    );

    const setTimer = useCallback(
        (seconds) => {
            if (seconds > 0) {
                startPlayback(seconds);
            }
        },
        [startPlayback]
    );

    const clearTimer = (reset_progress = true) => {
        clearInterval(playbackTimer);
        if (reset_progress) {
            setPlayback(0);
            setBuffer(0);
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

    const handleClick = (e) => {
        if (
            Object.keys(state.track).length === 0 ||
            state.mode === 'radio' ||
            !audioRef.current.src
        )
            return;
        //setBuffer(0);
        //const seconds = state.track.playtime_seconds;
        //const new_seconds = pct.toFixed(2) * seconds;
        //audioRef.current.currentTime = new_seconds;
        //setPlayback((pctClicked).toFixed(2));
        //updatePositionState();

    };

    useEffect(() => {
        if (state.track) {
            clearTimer();
            setTimer(state.track.playtime_seconds);

            if (state.mode === 'radio') {
                setPlayback(100);
            }
        }
    }, [state.track, setTimer]);

    useEffect(() => {
        if (state.track) {
            let backdropImage = '/img/no-album.png';
            if (state.mode === 'search' || state.mode === 'playlist') {
                if (state.track && state.track.cover) {
                    backdropImage =
                        process.env.REACT_APP_SERVER_URL +
                            '/api/v1/cover/' +
                            state.track.md5 +
                            '/10/10';
                }
            } else {
                backdropImage = state.track.cover;
            }
            // Set progress bar color
            const fac = new FastAverageColor();

            fac.getColorAsync(backdropImage)
                .then((color) => {
                    playerProgressbarRef.current.style.background =
                        color.hex;
                })
                .catch((_) => {
                    playerProgressbarRef.current.style.background =
                        '#333333';
                });
        }
    }, [state.track?.cover]);

    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, []);

    const progressClass =
        audioRef.current && audioRef.current.paused ? 'bg-secondary' : '';

    return (
        <div id="progress-cont" className="d-flex justify-content-center">
            <div
                ref={playerProgressRef}
                id="player-progress"
                className="progress"
                onClick={handleClick}
            >
                <div
                    ref={playerProgressbarRef}
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
