import { useEffect, useContext } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'react-feather';
import { SopranoContext } from './Soprano';

const PlayerControls = ({audioRef}) => {
    const { dispatch, state } = useContext(SopranoContext);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play()
                .then((_) => {
                    updateMeta();
                })
                .catch((_) => {});
        }
    };

    const pause = () => {
        audioRef.current.pause();
    };

    const stop = () => {
        console.log('STOP!');
        pause();
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
        audioRef.current.currentTime = Math.max(audioRef.current.currentTime - skipTime, 0);
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

    const updateMeta = () => {
        const track = state.track;
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
                { src: track.cover, sizes: '96x96', type: 'image/png' },
                { src: track.cover, sizes: '128x128', type: 'image/png' },
                { src: track.cover, sizes: '192x192', type: 'image/png' },
                { src: track.cover, sizes: '256x256', type: 'image/png' },
                { src: track.cover, sizes: '384x384', type: 'image/png' },
                { src: track.cover, sizes: '512x512', type: 'image/png' }
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
        if ('setPositionState' in navigator.mediaSession) {
            navigator.mediaSession.setPositionState({
                duration: parseFloat(audioRef.current.duration),
                playbackRate: audioRef.current.playbackRate,
                position: audioRef.current.currentTime
            });
        }
    };

    useEffect(() => {
        if (Object.keys(state.track).length > 0) {
            navigator.mediaSession.setPositionState(null);
            if (audioRef.current) {
                audioRef.current.onended = () => {
                    console.log('Audio ended, next...');
                    next();
                };
                audioRef.current.onplaying = () => {
                    console.log('Audio playing...');
                    navigator.mediaSession.playbackState = 'playing';
                    dispatch({ type: 'setStatus', payload: 'playing' });
                };
                audioRef.current.onpause = () => {
                    console.log('Audio paused...');
                    navigator.mediaSession.playbackState = 'paused';
                    dispatch({ type: 'setStatus', payload: 'paused' });
                };
                audioRef.current.onerror = (err) => {
                    console.log(err);
                };
                audioRef.current.onloadeddata = () => {
                    console.log('Data loaded, playing...');
                    play();
                };
                audioRef.current.onloadedmetadata = () => {
                    console.log('Metadata loaded...');
                };
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

    const activePlay = state.status === 'playing' ? ' active' : '';

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
                id="play-pause-btn"
                className={'btn btn-dark' + disabledPlay + activePlay}
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
