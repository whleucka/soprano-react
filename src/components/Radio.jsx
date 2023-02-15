import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';
import TrackRow from './TrackRow';

const Radio = ({ audioRef }) => {
    const { state } = useContext(SopranoContext);

    useEffect(() => {
        if (
            Object.keys(state.track).length > 0 &&
            state.track.src &&
            state.mode === 'radio'
        ) {
            const Hls = require('hls.js');
            if (Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource(state.track.src);
                hls.attachMedia(audioRef.current);
            }
        }
    }, [state.track.src]);


    return (
        <>
            <h2 className="header">Radio</h2>
            {state.radio_stations.map((station, index) => {
                return <TrackRow mode="radio" key={index} track={station} />;
            })}
        </>
    );
};

export default Radio;
