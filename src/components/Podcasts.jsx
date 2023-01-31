import PodcastSearch from './PodcastSearch';
import { useRef } from 'react';

const Podcasts = () => {
    const searchRef = useRef(null);

    return (
        <>
            <h2 className="header">Podcasts</h2>
            <PodcastSearch searchRef={searchRef} />
        </>
    );
};

export default Podcasts;
