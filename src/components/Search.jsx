import { useContext } from 'react';
import SearchResults from './SearchResults';
import SearchInput from './SearchInput';
import { SopranoContext } from './Soprano';
import SearchActions from './SearchActions';

const Search = () => {
    const {state} = useContext(SopranoContext);

    return (
        <>
            <h2 className="header">Search</h2>
            <SearchInput />
            { state.music.search.results.length > 0 &&
                <SearchActions />
            }
            <SearchResults />
        </>
    );
};

export default Search;
