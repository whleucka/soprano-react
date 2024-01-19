import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import TrackRows from './TrackRows';

const PodcastSearchResults = () => {
    const { state } = useContext(SopranoContext);
    return <TrackRows tracks={state.podcasts.search.results} mode="podcast" />;
};

export default PodcastSearchResults;
