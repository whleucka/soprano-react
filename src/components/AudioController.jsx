import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';

const AudioController = (props) => {
    const { audio } = props;
    const { state, dispatch } = useContext(SopranoContext);

    /**
     * Play track
     */
    const play = async () => {
        audio.current.play().then((_) => updateMetadata());
    };

    /**
     * Pause track
     */
    const pause = () => {
        audio.current.pause();
    };

    /**
     * Previous track
     */
    const prev = () => {
        if (!state.music.playlist.tracks.length) return;
        const index =
            (state.music.playlist.index -
                1 +
                state.music.playlist.tracks.length) %
            state.music.playlist.tracks.length;
        dispatch({ type: 'setPlaylistIndex', payload: index });
        play();
    };

    /**
     * Next track
     */
    const next = () => {
        if (!state.music.playlist.tracks.length) return;
        const index =
            (state.music.playlist.index + 1) %
            state.music.playlist.tracks.length;
        dispatch({ type: 'setPlaylistIndex', payload: index });
        play();
    };

    /**
     * Update the navigator media sessoin meta
     */
    const updateMetadata = () => {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: state.track?.title,
            artist: state.track?.artist,
            album: state.track?.album,
            artwork: [
                {
                    src: '/img/no-album.png',
                    sizes: '256x256',
                    type: 'image/png'
                }
            ]
        });
    };

    /**
     * When the track changes
     */
    useEffect(() => {
        if (state.track) {
            play();

            navigator.mediaSession.setActionHandler('play', async function () {
                await play();
            });

            navigator.mediaSession.setActionHandler('pause', function () {
                pause();
            });

            audio.current.addEventListener('play', function () {
                dispatch({ type: 'setStatus', payload: 'playing' });
                navigator.mediaSession.playbackState = 'playing';
            });

            audio.current.addEventListener('pause', function () {
                dispatch({ type: 'setStatus', payload: 'paused' });
                navigator.mediaSession.playbackState = 'paused';
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

    return <audio ref={audio} src={state.track?.src} />;
};

export default AudioController;
