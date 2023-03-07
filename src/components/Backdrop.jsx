import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';
import { FastAverageColor } from 'fast-average-color';

const Backdrop = ({ backdropRef }) => {
    const { state } = useContext(SopranoContext);
    const backdropImage =
        Object.keys(state.track).length > 0 && state.track.cover
            ? process.env.REACT_APP_SERVER_URL +
              '/api/v1/cover/' +
              state.track.md5 +
              '/500/500'
            : '/img/no-album.png';

    useEffect(() => {
        if (state.track) {
            const fac = new FastAverageColor();
            fac.getColorAsync(state.track.cover)
                .then((color) => {
                    backdropRef.current.style.backgroundColor = color.hex;
                })
                .catch((err) => {});
        }
    }, [state.track, backdropRef]);

    const imageUrl =
        state.status === 'idle' ? '/img/no-album.png' : backdropImage;

    return (
        <section
            ref={backdropRef}
            style={{ backgroundImage: `url(${imageUrl})` }}
            id="backdrop"
        >
            &nbsp;
        </section>
    );
};

export default Backdrop;
