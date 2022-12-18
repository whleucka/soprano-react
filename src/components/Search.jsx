import SearchResults from './SearchResults';
import MusicSearch from './MusicSearch';
import { useRef } from 'react';

const Search = () => {
    const searchRef = useRef(null);

    return (
        <>
            <h2 className="header">Search</h2>
            <MusicSearch searchRef={searchRef} />
            <SearchResults searchRef={searchRef} />
        </>
    );
};

export default Search;
