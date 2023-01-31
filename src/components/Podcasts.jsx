import PodcastSearch from './PodcastSearch';
import { useRef } from 'react';

const Podcasts = () => {
    const searchRef = useRef(null);

    return (
        <>
            <h2 className="header">Podcasts <img style={{height: '24px', paddingLeft: '5px'}} src="/img/listennotes.png" alt="listen notes" title="Listen Notes" /></h2>
            <PodcastSearch searchRef={searchRef} />
        </>
    );
};

export default Podcasts;
