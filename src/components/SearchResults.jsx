import { useContext } from 'react';
import SearchActions from './SearchActions';
import { SopranoContext } from './Soprano';
import TrackRow from './TrackRow';
import { Info as InfoIcon } from 'react-feather';

const SearchResults = ({ searchRef }) => {
    const { state } = useContext(SopranoContext);
    return (
        <div>
            {state.searchResults.length === 0 &&
                searchRef.current &&
                searchRef.current.value.length > 0 && (
                    <div className="alert alert-secondary my-3" role="alert">
                        <InfoIcon size="14" />{' '}
                        <strong>No matches found.</strong>
                    </div>
                )}
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
