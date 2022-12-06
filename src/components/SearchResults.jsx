import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import TrackRow from './TrackRow';

const SearchResults = () => {
    const { state } = useContext(SopranoContext);
    return (
        <>
            {state.searchResults.length > 0 &&
                state.searchResults.map((result, i) => (
                    <TrackRow key={i} track={result} />
                ))}
        </>
    );
};

export default SearchResults;
