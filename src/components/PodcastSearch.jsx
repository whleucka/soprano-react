import { useState, useContext, useEffect, useCallback } from 'react';
import { Search as SearchIcon, Trash as TrashIcon } from 'react-feather';
import { SopranoContext } from './Soprano';
import { BarLoader } from 'react-spinners';
import PodcastResults from './PodcastResults';
import API from './API';

const PodcastSearch = ({ searchRef }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [lastTerm, setLastTerm] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [nextOffset, setNextOffset] = useState(0);
    const [offset, setOffset] = useState(0);
    const [sortByDate, setSortByDate] = useState(1);
    const [total, setTotal] = useState(0);
    const [searching, setSearching] = useState(false);
    const { state, dispatch } = useContext(SopranoContext);

    const handleChange = (e) => {
        const term = e.currentTarget.value;
        setNoResults(false);
        setSearchTerm(term);
    };

    const handleKey = (e) => {
        if (e.defaultPrevented) {
            return;
        }
        if (e.keyCode === 13) {
            handleSubmit();
        } else if (e.keyCode === 27) {
            clearSearchTerm();
        }
    };

    const handleSubmit = useCallback(() => {
        setNoResults(false);
        setSearching(true);
        if (searchTerm.trim().length > 0) {
            dispatch({ type: 'setStatus', payload: 'podcast' });
            dispatch({ type: 'setPodcastResults', payload: [] });
            API.podcastSearch(searchTerm.trim(), sortByDate, offset)
                .then((res) => {
                    const podcasts = res.results;
                    setTotal(res.total);
                    setNextOffset(res.next_offset);
                    let all = [];
                    if (searchTerm !== lastTerm) {
                        setLastTerm(searchTerm);
                        all = podcasts;
                    } else {
                        all = [...state.podcastResults, ...podcasts];
                    }
                    setNoResults(!res.total);
                    dispatch({
                        type: 'setPodcastResults',
                        payload: all
                    });
                    setSearching(false);
                })
                .catch((err) => {
                    console.log(err);
                    setSearching(false);
                });
        }
    }, [dispatch, lastTerm, offset, searchTerm, sortByDate]);

    const loadMore = () => {
        setOffset(nextOffset);
    };

    const clearSearchTerm = () => {
        setSearchTerm('');
        setOffset(0);
        setNextOffset(0);
        setTotal(0);
        setNoResults(false);
        setSearching(false);
        dispatch({ type: 'setPodcastResults', payload: [] });
    };

    useEffect(() => {
        if (offset > 0 && offset < total) {
            handleSubmit();
        }
    }, [offset, total, handleSubmit]);

    return (
        <section id="podcast-search-module">
            <div
                id="podcast-search"
                className="input-group input-group-sm w-100"
            >
                <input
                    ref={searchRef}
                    placeholder="I want to listen to..."
                    type="search"
                    onChange={handleChange}
                    onKeyUp={handleKey}
                    value={searchTerm}
                    className="form-control form-control-sm bg-dark"
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-sm btn-dark"
                >
                    <SearchIcon height="14" />
                </button>
                {state.podcastResults.length > 0 && (
                    <button
                        type="submit"
                        onClick={clearSearchTerm}
                        style={{ borderLeft: 0 }}
                        className="btn btn-sm btn-dark"
                    >
                        <TrashIcon height="14" />
                    </button>
                )}
            </div>
            {noResults && (
                <div className="alert alert-secondary mt-2" role="alert">
                    <i className="bi bi-search me-2"></i> No results found for "
                    <strong>{searchTerm}</strong>"
                </div>
            )}

            {searching && (
                <BarLoader className="mt-3" color="#36d7b7" width="100%" />
            )}

            <PodcastResults />

            {state.podcastResults.length > 0 && offset < total && (
                <button
                    onClick={loadMore}
                    className="btn btn-sm btn-secondary my-2"
                >
                    Load more
                </button>
            )}
        </section>
    );
};

export default PodcastSearch;
