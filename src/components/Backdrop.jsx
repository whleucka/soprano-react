import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';
import { FastAverageColor } from 'fast-average-color';

const Backdrop = ({ backdropRef }) => {
    const { state } = useContext(SopranoContext);
    let backdropImage = '/img/no-album.png';
    if (state.mode === 'search' || state.mode === 'playlist') {
        if (Object.keys(state.track).length > 0 && state.track.cover) {
            backdropImage =
                process.env.REACT_APP_SERVER_URL +
                '/api/v1/cover/' +
                state.track.md5 +
                '/10/10';
        }
    } else if (state.mode === 'radio' || state.mode === 'podcast') {
        backdropImage = state.track.cover;
    }

    useEffect(() => {
        if (state.track) {
            console.log("Updating backdropImage");
            const fac = new FastAverageColor();
            fac.getColorAsync(backdropImage)
                .then((color) => {
                    backdropRef.current.style.backgroundColor = color.hex;
                    backdropRef.current.style.backgroundImage = `url(${backdropImage})`;
                })
                .catch((_) => {});
        }
    }, [state.track.cover]);

    return (
        <section
            ref={backdropRef}
            style={{ backgroundImage: `url('/img/no-album.png')` }}
            id="backdrop"
        >
            &nbsp;
        </section>
    );
};

export default Backdrop;
