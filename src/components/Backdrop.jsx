import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';
import { FastAverageColor } from 'fast-average-color';

const Backdrop = ({ backdropRef }) => {
    const { state } = useContext(SopranoContext);
    let backdropImage = '/img/no-album';
    if (state.mode === 'search' || state.mode === 'playlist') {
        if (Object.keys(state.track).length > 0 && state.track.cover) {
            backdropImage =
                process.env.REACT_APP_SERVER_URL +
                '/api/v1/cover/' +
                state.track.md5 +
                '/500/500';
        }
    } else if (state.mode === 'radio' || state.mode === 'podcast') {
        backdropImage = state.track.cover;
    }

    useEffect(() => {
        if (state.track) {
            const fac = new FastAverageColor();
            fac.getColorAsync(state.track.cover)
                .then((color) => {
                    backdropRef.current.style.backgroundColor = color.hex;
                })
                .catch(console.log);
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
