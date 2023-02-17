import { useEffect, useContext, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'react-feather';
import { SopranoContext } from './Soprano';
import useMediaSession from './MediaSession';

const PlayerControls = ({ audioRef }) => {
    const { dispatch, state } = useContext(SopranoContext);
    const track = state.track;

    const updatePositionState = useCallback(() => {
        if ('setPositionState' in navigator.mediaSession) {
            navigator.mediaSession.setPositionState({
                duration: Math.floor(audioRef.current.duration),
                playbackRate: audioRef.current.playbackRate,
                position: audioRef.current.currentTime
            });
        }
    }, [audioRef]);

    const updateMeta = useCallback(() => {
        const track = state.track;
        if (track) {
            document.title = `Soprano • ${track.artist} — ${track.title}`;
        }
    }, [state.track, audioRef]);

    const play = useCallback(() => {
        if (audioRef.current) {
            audioRef.current
                .play()
                .then((_) => {
                    updatePositionState();
                })
                .catch((_) => {});
        }
    }, [audioRef, updatePositionState]);

    const pause = useCallback(() => {
        audioRef.current.pause();
    }, [audioRef]);

    const stop = useCallback(() => {
        console.log('STOP!');
        pause();
    }, [pause]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                play();
            } else {
                pause();
            }
        }
    };

    const shuffleIndex = useCallback(() => {
        let exit = false;
        while (!exit) {
            let index = Math.floor(Math.random() * state.playlist.length);
            if (index !== state.playlistIndex) return index;
        }
    }, [state.playlist, state.playlistIndex]);

    const previous = useCallback(() => {
        if (state.playlist.length < 2) {
            return;
        }
        let prevIndex =
            (state.playlistIndex - 1 + state.playlist.length) %
            state.playlist.length;
        if (state.shuffle) {
            prevIndex = shuffleIndex();
        }
        dispatch({ type: 'setPlaylistIndex', payload: prevIndex });
    }, [
        state.playlist.length,
        state.playlistIndex,
        dispatch,
        shuffleIndex,
        state.shuffle
    ]);

    const next = useCallback(() => {
        if (state.playlist.length < 2) {
            return;
        }
        let nextIndex = (state.playlistIndex + 1) % state.playlist.length;
        if (state.shuffle) {
            nextIndex = shuffleIndex();
        }
        dispatch({ type: 'setPlaylistIndex', payload: nextIndex });
    }, [
        state.playlist.length,
        state.playlistIndex,
        dispatch,
        shuffleIndex,
        state.shuffle
    ]);

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

    useMediaSession({
        title: track.title,
        artist: track.artist,
        album: track.album,
        artwork: [
            { src: track.cover, sizes: '96x96', type: 'image/png' },
            { src: track.cover, sizes: '128x128', type: 'image/png' },
            { src: track.cover, sizes: '192x192', type: 'image/png' },
            { src: track.cover, sizes: '256x256', type: 'image/png' },
            { src: track.cover, sizes: '384x384', type: 'image/png' },
            { src: track.cover, sizes: '512x512', type: 'image/png' }
        ],
        onSeekBackward: seekBackward,
        onSeekForward: seekForward,
        onPlay: play,
        onPause: pause,
        onPreviousTrack: previous,
        onNextTrack: next,
        onSeekTo: seekTo,
        onStop: stop
    });

    useEffect(() => {
        if (Object.keys(state.track).length > 0 && state.mode != 'radio') {
            if (audioRef.current) {
                audioRef.current.onended = () => {
                    next();
                };
                audioRef.current.onplay = () => {
                    navigator.mediaSession.playbackState = 'playing';
                }
                audioRef.current.onplaying = () => {
                    dispatch({ type: 'setStatus', payload: 'playing' });
                };
                audioRef.current.onpause = () => {
                    dispatch({ type: 'setStatus', payload: 'paused' });
                    navigator.mediaSession.playbackState = 'paused';
                };
                audioRef.current.onloadeddata = () => {
                    play();
                };
                audioRef.current.onloadedmetadata = () => {
                    updateMeta();
                };
            }
        }
    }, [state.track, audioRef, dispatch, next, play, updateMeta]);

    useEffect(() => {
        if (state.playlist.length > 0) {
            const track = state.playlist[state.playlistIndex];
            if (track) {
                dispatch({ type: 'setTrack', payload: track });
                const playlistRow = document.getElementById(
                    'playlist-row-' + state.playlistIndex
                );
                if (playlistRow) {
                    playlistRow.focus();
                }
            }
        }
    }, [state.playlistIndex, dispatch, state.playlist]);

    const disabledNextPrev = state.playlist.length === 0 ? ' disabled' : '';

    const disabledPlay = Object.keys(track).length === 0 ? ' disabled' : '';

    const activePlay = state.status === 'playing' ? ' active' : '';

    return (
        <div
            id="player-controls"
            className="d-flex align-items-center justify-content-center h-100 w-100"
        >
            <button
                id="skip-backwards"
                className={'btn btn-dark' + disabledNextPrev}
                onClick={previous}
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
                onClick={next}
            >
                <SkipForward />
            </button>
        </div>
    );
};

export default PlayerControls;
