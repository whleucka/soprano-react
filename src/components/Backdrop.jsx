import { useContext } from 'react';
import { SopranoContext } from './Soprano';

const Backdrop = () => {
    const {state} = useContext(SopranoContext);
    const backdropImage = state.track
        ? Object.keys(state.track).length > 0 && state.track.backdrop
            ? state.track.backdrop
            : process.env.REACT_APP_SERVER_URL + state.track.cover
        : "/img/no-album.png";

    return (
        <section
            style={{ backgroundImage: `url(${backdropImage})` }}
            id="backdrop"
        >
            &nbsp;
        </section>
    );
}

export default Backdrop;
