import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';
import { Info as InfoIcon } from 'react-feather';
import Hls from 'hls.js';
import TrackRows from './TrackRows';

const Radio = ({ audioRef }) => {
    const { state, dispatch } = useContext(SopranoContext);

    useEffect(() => {
        if (state.track?.src && state.mode === "radio") {
            let hls = new Hls();
            if (Hls.isSupported()) {
                hls.attachMedia(audioRef.current);
                hls.on(Hls.Events.MEDIA_ATTACHED, (event, data) => {
                    hls.loadSource(state.track?.src);
                    dispatch({ type: "setStatus", payload: "play"});
                });
            }
        }
    }, [state.track?.src]);

    return (
       <>
            <h2 className="header">HD Radio</h2>
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
