import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import TrackRows from './TrackRows';

const SearchResults = () => {
    const { state } = useContext(SopranoContext);
    return <TrackRows tracks={state.music.search.results} mode="search" />;
};

export default SearchResults;
