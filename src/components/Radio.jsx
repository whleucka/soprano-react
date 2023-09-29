import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';
import { Info as InfoIcon } from 'react-feather';
import Hls from 'hls.js';
import API from './API';
import TrackRows from './TrackRows';

let hls = new Hls();

const Radio = ({ audioRef }) => {
    const { state, dispatch } = useContext(SopranoContext);
    hls = new Hls();

    const getAlbumArtwork = () => {
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

    const updateMetadata = () => {
        if (state.track.cover) {
            const metadataInit = {
                title: state.track.title,
                artist: state.track.artist,
                album: state.track.album,
                artwork: getAlbumArtwork()
            };
            navigator.mediaSession.metadata = new MediaMetadata(metadataInit);
            // console.log(navigator.mediaSession);
            updatePositionState();
        }
    };

    const updatePositionState = () => {
        try {
            const duration = audioRef.current?.duration;
            if ('setPositionState' in navigator.mediaSession && !isNaN(duration) && isFinite(duration)) {
                console.log("Logging position", audioRef.current.currentTime);
                navigator.mediaSession.setPositionState({
                    duration: audioRef.current.duration,
                    playbackRate: audioRef.current.playbackRate,
                    position: audioRef.current.currentTime
                });
            }
        } catch (err) {
            console.log("Position error", audioRef);
            console.log(err);
        }
    };

    useEffect(() => {
        if (state.track?.src && state.mode === "radio") {
            if (Hls.isSupported()) {
                hls.attachMedia(audioRef.current);
                hls.on(Hls.Events.MEDIA_ATTACHED, (event, data) => {
                    hls.loadSource(state.track?.src);
                    audioRef.current.play().then(_ => updateMetadata());
                });
            }
        }
        return () => {
            //hls.stopLoad();
            //hls.destroy();
        };
    }, [state.track?.src]);

    useEffect(() => {
        // Load radio stations
        // you must reload the app to see newly added radio stations, for now
        if (!state.radio.stations.length) {
            API.radioStations().then((res) => {
                if (res.length > 0) {
                    const stations = [];
                    res.forEach((station) => {
                        const cover = station.cover_url
                            ? process.env.REACT_APP_SERVER_URL + '/api/v1/image?url=' + station.cover_url
                            : '/img/no-album.png';
                        const location = station.location
                            ? station.location
                            : 'Internet';
                        let s = {
                            md5: station.id + '_radio',
                            artist: location,
                            album: 'Soprano Radio',
                            title: station.station_name,
                            cover,
                            playtime_seconds: 0,
                            playtime_string: null,
                            src: station.src_url
                        };
                        stations.push(s);
                    });
                    dispatch({
                        type: 'setRadioStations',
                        payload: stations
                    });
                }
            });
        }
    }, []);

    return (
        <>
            <h2 className="header">Radio</h2>
            {state.radio.stations.length > 0 && (
                <TrackRows tracks={state.radio.stations} mode="radio" />
            )}
            {state.radio.stations.length === 0 && (
                <div className="alert alert-secondary mt-2" role="alert">
                    <InfoIcon size="14" /> No radio stations available
                </div>
            )}
        </>
    );
};

export default Radio;
