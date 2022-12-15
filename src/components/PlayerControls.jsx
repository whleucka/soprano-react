import { useEffect, useContext } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'react-feather';
import { SopranoContext } from './Soprano';

const PlayerControls = () => {
    const { dispatch, state } = useContext(SopranoContext);

    const play = () => {
        const audio = document.getElementById('audio');
        if (audio) {
            audio.play()
                .then((_) => {
                    updateMeta();
                })
                .catch((err) => console.log(err));
        }
    };

    const pause = () => {
        const audio = document.getElementById('audio');
        audio.pause();
    };

    const stop = () => {
        console.log('STOP!');
    };

    const handlePlayPause = () => {
        const audio = document.getElementById('audio');
        if (audio) {
            if (audio.paused) {
                play();
            } else {
                pause();
            }
        }
    };

    const previous = () => {
        if (state.playlist.length < 2) {
            return;
        }
        let prevIndex =
            (state.playlistIndex - 1 + state.playlist.length) %
            state.playlist.length;
        dispatch({ type: 'setPlaylistIndex', payload: prevIndex });
        console.log('Now playing playlistIndex', prevIndex);
    };

    const next = () => {
        if (state.playlist.length < 2) {
            return;
        }
        let nextIndex = (state.playlistIndex + 1) % state.playlist.length;
        console.log('Now playing playlistIndex', nextIndex);
        dispatch({ type: 'setPlaylistIndex', payload: nextIndex });
    };

    const seekTo = (e) => {
        const audio = document.getElementById('audio');
        if (e.fastSeek && 'fastSeek' in audio) {
            audio.fastSeek(e.seekTime);
            return;
        }
        audio.currentTime = e.seekTime;
        updatePositionState();
    };

    const seekBackward = (e) => {
        const audio = document.getElementById('audio');
        const defaultSkipTime = 10;
        const skipTime = e.seekOffset || defaultSkipTime;
        audio.currentTime = Math.max(audio.currentTime - skipTime, 0);
        updatePositionState();
    };
    const seekForward = (e) => {
        const audio = document.getElementById('audio');
        const defaultSkipTime = 10;
        const skipTime = e.seekOffset || defaultSkipTime;
        audio.currentTime = Math.min(
            audio.currentTime + skipTime,
            audio.duration
        );
        updatePositionState();
    };

    const updateMeta = () => {
        const track = state.track;
        const coverUrl = track.cover && track.cover.substring(0, 4) !== 'http'
            ? process.env.REACT_APP_SERVER_URL + track.cover
            : track.cover;
        document.title = `Soprano • ${track.artist} — ${track.title}`;
        console.log('Updating metadata...');
        navigator.mediaSession.setActionHandler('seekbackward', seekBackward);
        navigator.mediaSession.setActionHandler('seekforward', seekForward);
        navigator.mediaSession.setActionHandler('previoustrack', previous);
        navigator.mediaSession.setActionHandler('nexttrack', next);
        navigator.mediaSession.setActionHandler('play', play);
        navigator.mediaSession.setActionHandler('pause', pause);
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist,
            album: track.album,
            artwork: [
                { src: coverUrl, sizes: '96x96', type: 'image/png' },
                { src: coverUrl, sizes: '128x128', type: 'image/png' },
                { src: coverUrl, sizes: '192x192', type: 'image/png' },
                { src: coverUrl, sizes: '256x256', type: 'image/png' },
                { src: coverUrl, sizes: '384x384', type: 'image/png' },
                { src: coverUrl, sizes: '512x512', type: 'image/png' }
            ]
        });
        try {
            navigator.mediaSession.setActionHandler('stop', stop);
        } catch (err) {
            console.log('Stop not supported');
        }
        try {
            navigator.mediaSession.setActionHandler('seekto', seekTo);
        } catch (err) {
            console.log('Seek to not supported');
        }
        updatePositionState();
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

    useEffect(() => {
        if (Object.keys(state.track).length > 0) {
            navigator.mediaSession.setPositionState(null);
            const audio = document.getElementById('audio');
            if (audio) {
                audio.onended = () => {
                    next();
                };
                audio.onplaying = () => {
                    navigator.mediaSession.playbackState = 'playing';
                    dispatch({ type: 'setStatus', payload: 'playing' });
                };
                audio.onpause = () => {
                    navigator.mediaSession.playbackState = 'paused';
                    dispatch({ type: 'setStatus', payload: 'paused' });
                };
                audio.onerror = () => {
                    dispatch({ type: 'setStatus', payload: 'idle' });
                };
                audio.onloadedmetadata = () => {
                };
                play();
            }
        }
    }, [state.track]);

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
    }, [state.playlistIndex]);

    const disabledNextPrev = state.playlist.length === 0 ? ' disabled' : '';

    const disabledPlay =
        Object.keys(state.track).length === 0 ? ' disabled' : '';

    return (
        <div
            id="player-controls"
            className="d-flex align-items-center justify-content-center h-100 w-100"
        >
            <button
                className={'btn btn-dark' + disabledNextPrev}
                onClick={previous}
            >
                <SkipBack />
            </button>
            <button
                className={'btn btn-dark' + disabledPlay}
                onClick={handlePlayPause}
            >
                {state.status !== 'playing' && <Play />}
                {state.status === 'playing' && <Pause />}
            </button>
            <button
                className={'btn btn-dark' + disabledNextPrev}
                onClick={next}
            >
                <SkipForward />
            </button>
        </div>
    );
};

export default PlayerControls;
