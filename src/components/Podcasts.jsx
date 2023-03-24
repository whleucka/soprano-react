import PodcastSearch from './PodcastSearch';
import { useRef, useEffect, useContext } from 'react';
import { SopranoContext } from './Soprano';

const Podcasts = () => {
    const { dispatch } = useContext(SopranoContext);
    const searchRef = useRef(null);

    useEffect(() => {
        dispatch({ type: 'setMode', payload: 'podcast' });
    }, []);

    return (
        <>
            <h2 className="header">
                Podcasts{' '}
                <img
                    style={{ height: '24px', paddingLeft: '5px' }}
                    src="/img/listennotes.png"
                    alt="listen notes"
                    title="Listen Notes"
                />
            </h2>
            <PodcastSearch searchRef={searchRef} />
        </>
    );
};

export default Podcasts;
