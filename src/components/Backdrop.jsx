import { useContext } from 'react';
import { SopranoContext } from './Soprano';

const Backdrop = () => {
    const { state } = useContext(SopranoContext);
    const backdropImage =
        Object.keys(state.track).length > 0 && state.track.cover
            ? state.track.cover
            : null;

    const imageUrl =
        state.status === 'idle' ? '/img/no-album.png' : backdropImage;

    return (
        <section style={{ backgroundImage: `url(${imageUrl})` }} id="backdrop">
            &nbsp;
        </section>
    );
};

export default Backdrop;
