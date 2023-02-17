import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';
import TrackRow from './TrackRow';
import { Info as InfoIcon } from 'react-feather';
import Hls from 'hls.js';
import API from './API';

let hls = new Hls();
let interval = null;

const Radio = ({ audioRef }) => {
    const { state, dispatch } = useContext(SopranoContext);

    const updateMeta = () => {
        API.parseRadio(state.track.src)
            .then((res) => {
                if (res.title && res.artist) {
                    res.title = res.title.replace('///', '').trim();
                    res.artist = res.artist.replace('///', '').trim();
                    if (res.title !== res.artist) {
                        document.title = `Soprano • ${res.artist} — ${res.title}`;
                        dispatch({ type: 'setTrackTitleArtist', payload: res });
                    }
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        clearInterval(interval);
        if (
            Object.keys(state.track).length > 0 &&
            state.track.src &&
            state.mode === 'radio'
        ) {
            if (Hls.isSupported()) {
                hls = new Hls();
                hls.attachMedia(audioRef.current);
                hls.on(Hls.Events.MEDIA_ATTACHED, (event, data) => {
                    updateMeta();
                    hls.loadSource(state.track.src)
                    interval = setInterval(updateMeta, 20000);
                });
            }
        }
        return () => {
            hls.stopLoad();
            hls.destroy();
            clearInterval(interval);
        };
    }, [state.track.src]);

    useEffect(() => {
        dispatch({ type: 'setMode', payload: 'radio' });
    }, []);

    return (
        <>
            <h2 className="header">Radio</h2>
            {state.radio_stations.length > 0 && (
                <div>
                    {state.radio_stations.map((station, index) => {
                        return (
                            <TrackRow
                                mode="radio"
                                key={index}
                                track={station}
                            />
                        );
                    })}
                </div>
            )}
            {state.radio_stations.length === 0 && (
                <div className="alert alert-secondary mt-2" role="alert">
                    <InfoIcon size="14" /> No radio stations available
                </div>
            )}
        </>
    );
};

export default Radio;
