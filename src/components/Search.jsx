import SearchResults from './SearchResults';
import MusicSearch from './MusicSearch';
import { SopranoContext } from './Soprano';
import { useRef, useEffect, useContext } from 'react';

const Search = () => {
    const { dispatch } = useContext(SopranoContext);
    const searchRef = useRef(null);

    useEffect(() => {
        dispatch({ type: 'setMode', payload: 'search' });
    }, []);

    return (
        <>
            <h2 className="header">Search</h2>
            <MusicSearch searchRef={searchRef} />
            <SearchResults searchRef={searchRef} />
        </>
    );
};

export default Search;
