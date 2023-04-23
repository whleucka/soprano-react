import { useEffect, useContext, useCallback } from 'react';
import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Shuffle,
    Repeat
} from 'react-feather';
import { SopranoContext } from './Soprano';

const PlayerControls = ({ audioRef }) => {
    const { dispatch, state } = useContext(SopranoContext);
    const track = state.track;

    const updateMeta = () => {
        const track = state.track;
        if (track) {
            document.title = `Soprano • ${track.artist} — ${track.title}`;
            navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist,
            album: track.album,
            artwork:
                [
                    {
                        src:
                            process.env.REACT_APP_API_URL + `/cover/${track.md5}/96/96`,
                        sizes: '96x96',
                        type: 'image/png'
                    },
                    {
                        src:
                            process.env.REACT_APP_API_URL +
                            `/cover/${track.md5}/128/j28`,
                        sizes: '128x128',
                        type: 'image/png'
                    },
                    {
                        src:
                            process.env.REACT_APP_API_URL +
                            `/cover/${track.md5}/192/192`,
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src:
                            process.env.REACT_APP_API_URL +
                            `/cover/${track.md5}/256/256`,
                        sizes: '256x256',
                        type: 'image/png'
                    },
                    {
                        src:
                            process.env.REACT_APP_API_URL +
                            `/cover/${track.md5}/384/384`,
                        sizes: '384x384',
                        type: 'image/png'
                    },
                    {
                        src:
                            process.env.REACT_APP_API_URL +
                            `/cover/${track.md5}/512/512`,
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
        });
        }
    };

    const play = async() => {
        if (audioRef.current) {
            audioRef.current
                .play()
                .then((_) => {
                    updateMeta();
                })
        }
    };

    const pause = () => {
        audioRef.current.pause();
    };

    const stop = () => {
        console.log('STOP!');
    };

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                play();
            } else {
                pause();
            }
        }
    };

    const shuffleIndex = () => {
        let exit = false;
        while (!exit) {
            let index = Math.floor(Math.random() * state.playlist.length);
            if (index !== state.playlistIndex) return index;
        }
    };

    const previous = () => {
        if (state.playlist.length < 2) {
            return;
        }
        dispatch({ type: 'setMode', payload: 'playlist' });
        let prevIndex =
            (state.playlistIndex - 1 + state.playlist.length) %
            state.playlist.length;
        if (state.shuffle) {
            prevIndex = shuffleIndex();
        }
        dispatch({ type: 'setPlaylistIndex', payload: prevIndex });
    };

    const next = () => {
        if (state.playlist.length < 2) {
            return;
        }
        dispatch({ type: 'setMode', payload: 'playlist' });
        let nextIndex = (state.playlistIndex + 1) % state.playlist.length;
        if (state.shuffle) {
            nextIndex = shuffleIndex();
        }
        dispatch({ type: 'setPlaylistIndex', payload: nextIndex });
    };

    const seekTo = (e) => {
        if (e.fastSeek && 'fastSeek' in audioRef.current) {
            audioRef.current.fastSeek(e.seekTime);
            return;
        }
        audioRef.current.currentTime = e.seekTime;
        updatePositionState();
    };

    const seekBackward = (e) => {
        const defaultSkipTime = 10;
        const skipTime = e.seekOffset || defaultSkipTime;
        audioRef.current.currentTime = Math.max(
            audioRef.current.currentTime - skipTime,
            0
        );
        updatePositionState();
    };

    const seekForward = (e) => {
        const defaultSkipTime = 10;
        const skipTime = e.seekOffset || defaultSkipTime;
        audioRef.current.currentTime = Math.min(
            audioRef.current.currentTime + skipTime,
            audioRef.current.duration
        );
        updatePositionState();
    };

    const toggleShuffle = () => {
        dispatch({ type: 'toggleShuffle', payload: !state.shuffle });
    };

    const toggleRepeat = () => {
        dispatch({ type: 'toggleRepeat', payload: !state.repeat });
    };

    const updatePositionState = () => {
        const { mediaSession } = navigator;
        if ('setPositionState' in mediaSession) {
            console.log("Now updating position", {
                duration: audioRef.current.duration,
                playbackRate: audioRef.current.playbackRate,
                position: audioRef.current.currentTime
            });
            navigator.mediaSession.setPositionState({
                duration: audioRef.current.duration,
                playbackRate: audioRef.current.playbackRate,
                position: audioRef.current.currentTime
            });
        }
    };

    useEffect(() => {
        if (state.track) {
            updateMeta();

            navigator.mediaSession.setActionHandler('play', async function() {
                console.log('> User clicked "Play" icon.');
                await play();
            });

            navigator.mediaSession.setActionHandler('pause', function() {
                console.log('> User clicked "Pause" icon.');
                pause();
            });

            audioRef.current.addEventListener('play', function() {
                navigator.mediaSession.playbackState = 'playing';
                dispatch({ type: 'setStatus', payload: 'playing' });
            });

            audioRef.current.addEventListener('pause', function() {
                navigator.mediaSession.playbackState = 'paused';
                dispatch({ type: 'setStatus', payload: 'paused' });
            });

            navigator.mediaSession.setActionHandler('previoustrack', function() {
                console.log('> User clicked "Previous Track" icon.');
                previous();
            });

            navigator.mediaSession.setActionHandler('nexttrack', function() {
                console.log('> User clicked "Next Track" icon.');
                next();
            });
        }
    }, [state.track]);

    useEffect(() => {
        if (state.playlistIndex >= 0) {
            const track = state.playlist[state.playlistIndex];
            if (track) {
                dispatch({ type: 'setTrack', payload: track });
                dispatch({ type: 'setMode', payload: 'playlist' });
                const playlistRow = document.getElementById(
                    'playlist-row-' + state.playlistIndex
                );
                if (playlistRow) {
                    playlistRow.focus();
                }
            }
        }
    }, [state.playlistIndex]);

    const disabledNextPrev = state.playlist.length === 0 ? ' disabled' : '';

    const disabledPlay = Object.keys(track).length === 0 ? ' disabled' : '';

    const activePlay = state.status === 'playing' ? ' active' : '';

    const shuffleStyle = state.shuffle ? 'active' : 'inactive';
    const repeatStyle = state.repeat ? 'active' : 'inactive';

    const buttonAnimate = (e) => {
        return new Promise((resolve) => {
            e.currentTarget.classList.add('active');
            setTimeout(() => {
                resolve();
            }, 250);
        });
    };

    return (
        <div
            id="player-controls"
            className="d-flex align-items-center justify-content-center h-100 w-100"
        >
            <button
                id="shuffle"
                className={'btn btn-dark ' + shuffleStyle}
                onClick={toggleShuffle}
            >
                <Shuffle />
            </button>
            <button
                id="skip-backwards"
                className={'btn btn-dark' + disabledNextPrev}
                onClick={(e) => {
                    e.currentTarget.blur();
                    var target = e.currentTarget;
                    return buttonAnimate(e).then((_) => {
                        target.classList.remove('active');
                        previous();
                    });
                }}
            >
                <SkipBack />
            </button>
            <button
                id="play-pause-btn"
                className={'btn btn-dark' + disabledPlay + activePlay}
                onClick={handlePlayPause}
            >
                {state.status !== 'playing' && <Play />}
                {state.status === 'playing' && <Pause />}
            </button>
            <button
                id="skip-forward"
                className={'btn btn-dark' + disabledNextPrev}
                onClick={(e) => {
                    e.currentTarget.blur();
                    var target = e.currentTarget;
                    return buttonAnimate(e).then((_) => {
                        target.classList.remove('active');
                        next();
                    });
                }}
            >
                <SkipForward />
            </button>
            <button
                id="repeat"
                className={'btn btn-dark ' + repeatStyle}
                onClick={toggleRepeat}
            >
                <Repeat />
            </button>
        </div>
    );
};

export default PlayerControls;
