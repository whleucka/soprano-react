import { useContext } from 'react';
import { SopranoContext } from './Soprano';

const Audio = () => {
    const { state } = useContext(SopranoContext);

    const trackUrl = state.status === 'idle'
        ? ''
        : state.track.src;

    return <audio id="audio" src={trackUrl} />;
}

export default Audio;
