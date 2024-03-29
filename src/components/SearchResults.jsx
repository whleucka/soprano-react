import { useContext } from 'react';
import SearchActions from './SearchActions';
import { SopranoContext } from './Soprano';
import TrackRow from './TrackRow';

const SearchResults = ({ searchRef }) => {
    const { state } = useContext(SopranoContext);
    return (
        <div>
            {state.searchResults.length > 0 && (
                <div>
                    <SearchActions />
                    {state.searchResults.map((result, i) => (
                        <TrackRow key={i} mode="search" track={result} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
