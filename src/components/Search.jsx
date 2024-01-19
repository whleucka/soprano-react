import { useContext } from 'react';
import SearchResults from './SearchResults';
import SearchInput from './SearchInput';
import { SopranoContext } from './Soprano';
import SearchActions from './SearchActions';
import SearchLinks from './SearchLinks';

const Search = () => {
    const { state } = useContext(SopranoContext);

    return (
        <>
            <SearchLinks />
            <SearchInput />
            {state.music.search.results.length > 0 && <SearchActions />}
            <SearchResults />
        </>
    );
};

export default Search;
