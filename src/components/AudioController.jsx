import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';

const AudioController = (props) => {
    const { audioRef } = props;
    const { state, dispatch } = useContext(SopranoContext);

    /**
     * Play track
     */
    const play = async () => {
        if (state.track) {
            await audioRef.current.play().catch(_ => {});
            updatePositionState();
        };
    };

    /**
     * Pause track
     */
    const pause = () => {
        audioRef.current.pause();
    };

    /**
     * Previous track
     */
    const prev = () => {
        if (!state.music.playlist.tracks.length) return;
        const index = state.music.controls.shuffle
            ? shuffleIndex()
            : prevIndex();
        dispatch({ type: 'setPlaylistIndex', payload: index });
        dispatch({ type: 'setMode', payload: 'playlist' });
        play();
    };

    /**
     * Next track
     */
    const next = () => {
        if (!state.music.playlist.tracks.length) return;
        const index = state.music.controls.shuffle
            ? shuffleIndex()
            : nextIndex();
        dispatch({ type: 'setPlaylistIndex', payload: index });
        dispatch({ type: 'setMode', payload: 'playlist' });
        play();
    };

    const prevIndex = () => {
        return (
            (state.music.playlist.index -
                1 +
                state.music.playlist.tracks.length) %
            state.music.playlist.tracks.length
        );
    };

    const nextIndex = () => {
        return (
            (state.music.playlist.index + 1) %
            state.music.playlist.tracks.length
        );
    };

    const shuffleIndex = () => {
        let mod =
            Math.floor(Math.random() * state.music.playlist.tracks.length) + 1;
        let index = (
            (state.music.playlist.index + mod) %
            state.music.playlist.tracks.length
        );
        if (state.music.playlist.tracks.length > 1 && index === state.music.playlist.index) {
            return shuffleIndex();
        }
        return index;
    };

    const getAlbumArtwork = () => {
        if (state.mode === "search" || state.mode === "playlist") {
            return [
                {
                    src:
                        process.env.REACT_APP_API_URL +
                        `/cover/${state.track.md5}/96/96`,
                    sizes: '96x96',
                    type: 'image/png'
                },
                {
                    src:
                        process.env.REACT_APP_API_URL +
                        `/cover/${state.track.md5}/128/128`,
                    sizes: '128x128',
                    type: 'image/png'
                },
                {
                    src:
                        process.env.REACT_APP_API_URL +
                        `/cover/${state.track.md5}/192/192`,
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src:
                        process.env.REACT_APP_API_URL +
                        `/cover/${state.track.md5}/256/256`,
                    sizes: '256x256',
                    type: 'image/png'
                },
                {
                    src:
                        process.env.REACT_APP_API_URL +
                        `/cover/${state.track.md5}/384/384`,
                    sizes: '384x384',
                    type: 'image/png'
                },
                {
                    src:
                        process.env.REACT_APP_API_URL +
                        `/cover/${state.track.md5}/512/512`,
                    sizes: '512x512',
                    type: 'image/png'
                }
            ];
        } else {
            return [
                {
                    src: state.track.cover,
                    sizes: '96x96',
                    type: 'image/png'
                },
                {
                    src: state.track.cover,
                    sizes: '128x128',
                    type: 'image/png'
                },
                {
                    src: state.track.cover,
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: state.track.cover,
                    sizes: '256x256',
                    type: 'image/png'
                },
                {
                    src: state.track.cover,
                    sizes: '384x384',
                    type: 'image/png'
                },
                {
                    src: state.track.cover,
                    sizes: '512x512',
                    type: 'image/png'
                }
            ];
        }
    }

    /**
     * Update the navigator media sessoin meta
     */
    const updateMetadata = () => {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: state.track.title,
            artist: state.track.artist,
            album: state.track.album,
            artwork: getAlbumArtwork()
        });
    };

    const updatePositionState = () => {
        if (state.mode === "radio" || state.mode === "podcast") return;
        
        if ('setPositionState' in navigator.mediaSession && (!isNaN(audioRef.current.duration) && isFinite(audioRef.current.duration))) {
            navigator.mediaSession.setPositionState({
                duration: audioRef.current.duration,
                playbackRate: audioRef.current.playbackRate,
                position: audioRef.current.currentTime
            });
        }
    };

    /**
     * When the track changes
     */
    useEffect(() => {
        if (state.track?.src) {
            play();

            navigator.mediaSession.setActionHandler('play', async function () {
                await play().catch(_ => {});
            });

            navigator.mediaSession.setActionHandler('pause', function () {
                pause();
            });

            audioRef.current.addEventListener('play', function () {
                dispatch({ type: 'setStatus', payload: 'playing' });
                navigator.mediaSession.playbackState = 'playing';
            });

            audioRef.current.addEventListener('pause', function () {
                dispatch({ type: 'setStatus', payload: 'paused' });
                navigator.mediaSession.playbackState = 'paused';
            });

            audioRef.current.addEventListener('ended', function () {
                next();
            });

            navigator.mediaSession.setActionHandler(
                'previoustrack',
                function () {
                    prev();
                }
            );

            navigator.mediaSession.setActionHandler('nexttrack', function () {
                next();
            });

            updateMetadata();
        }
    }, [state.track]);

    useEffect(() => {
        switch (state.status) {
            case 'next':
                next();
                break;
            case 'prev':
                prev();
                break;
            case 'play':
                play();
                break;
            case 'pause':
                pause();
                break;
            default:
                return;
        }
    }, [state.status]);

    /**
     * When the playlist index changes
     */
    useEffect(() => {
        const index = state.music.playlist.index;
        const track = state.music.playlist.tracks[index];
        dispatch({ type: 'setTrack', payload: track });
    }, [state.music.playlist.index]);

    return <audio ref={audioRef} src={state.track?.src} preload="false" autoPlay />;
};

export default AudioController;
