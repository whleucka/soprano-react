import { useContext, useEffect } from "react";
import { SopranoContext } from "./Soprano";

const AudioController = (props) => {
    const { audio } = props;
    const { state, dispatch } = useContext(SopranoContext);
    const play = async () => {
        audio.current.play()
            .then(_ => updateMetadata())
            .catch(err => console.log);
    };
    const pause = () => {
        audio.current.pause();
    };
    const prev = () => {
        if (!state.music.playlist.length) return;
        const index = (state.music.playlist.index - 1 + state.music.playlist.tracks.length) % state.music.playlist.tracks.length;
        dispatch({ type: 'setPlaylistIndex', payload: index });
        play();
    };
    const next = () => {
        if (!state.music.playlist.length) return;
        const index = (state.music.playlist.index + 1) % state.music.playlist.tracks.length;
        dispatch({ type: 'setPlaylistIndex', payload: index });
        play();
    };
    const updateMetadata = () => {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: state.track.title,
            artist: state.track.artist,
            album: state.track.album,
            artwork:
                [
                    {
                        src:
                            process.env.REACT_APP_API_URL + `/cover/${state.track.md5}/96/96`,
                        sizes: '96x96',
                        type: 'image/png'
                    },
                    {
                        src:
                            process.env.REACT_APP_API_URL +
                            `/cover/${state.track.md5}/128/j28`,
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
                ]
        });
    };

    useEffect(() => {
        if (state.track) {
            play();

            navigator.mediaSession.setActionHandler('play', async function() {
                await play();
            });

            navigator.mediaSession.setActionHandler('pause', function() {
                pause();
            });

            audio.current.addEventListener('play', function() {
                navigator.mediaSession.playbackState = 'playing';
            });

            audio.current.addEventListener('pause', function() {
                navigator.mediaSession.playbackState = 'paused';
            });

            navigator.mediaSession.setActionHandler('previoustrack', function() {
                prev();
            });

            navigator.mediaSession.setActionHandler('nexttrack', function() {
                next();
            });
        }
    }, [state.track]);

    return <audio ref={audio} src={state.track?.src} />;
};

export default AudioController;
