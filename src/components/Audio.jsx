import { useContext } from 'react';
import { SopranoContext } from './Soprano';

const Audio = () => {
    const {state} = useContext(SopranoContext);
    const trackUrl = state.trace && state.track.src
        ? state.track.src
        : process.env.REACT_APP_API_URL + `/music/play/${state.track.md5}`;
    return <audio id="audio" src={trackUrl} />;
}

export default Audio;
