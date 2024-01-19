import { useEffect, useContext, useState } from 'react';
import PodcastSearchResults from './PodcastSearchResults';
import { Search as SearchIcon, Trash as TrashIcon } from 'react-feather';
import API from './API';
import { SopranoContext } from './Soprano';
import { Util } from './Util';
import { BarLoader } from 'react-spinners';

const PodcastSearchInput = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [sortByDate, setSortByDate] = useState(1);
    const [searching, setSearching] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [nextOffset, setNextOffset] = useState(0);

    const handleInput = (e) => {
        const term = e.currentTarget.value;
        dispatch({ type: 'setPodcastSearchTerm', payload: term });
    };

    const handleKey = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        } else if (e.keyCode === 27) {
            handleClear();
        }
    };

    const loadMore = () => {
        setOffset(nextOffset);
    };

    const handleSubmit = () => {
        setSearching(true);
        const term = state.podcasts.search.term.trim();
        if (term.length > 0) {
            API.podcastSearch(term, sortByDate, offset)
                .then((res) => {
                    console.log(res);
                    let podcasts = [];
                    if (!res.total) setNoResults(true);
                    setTotal(res.total);
                    setNextOffset(res.next_offset);
                    res.results.forEach((track, i) => {
                        const podcast = {
                            md5: i + '_podcast',
                            artist: track.podcast.title_original,
                            album: 'Soprano Podcast',
                            title: track.title_original,
                            cover: process.env.REACT_APP_SERVER_URL + '/api/v1/image?url=' + track.image,
                            playtime_seconds: track.audio_length_sec,
                            playtime_string: Util.convertSeconds(
                                track.audio_length_sec
                            ),
                            src: track.audio
                        };
                        podcasts.push(podcast);
                    });
                    dispatch({
                        type: 'setPodcastSearchResults',
                        payload: [...state.podcasts.search.results, ...podcasts]
                    });
                    setSearching(false);
                })
                .catch((err) => {
                    console.log(err);
                    setSearching(false);
                });
        }
    };

    const handleClear = () => {
        dispatch({ type: 'setPodcastSearchResults', payload: [] });
        dispatch({ type: 'setPodcastSearchTerm', payload: '' });
        setOffset(0);
        setNextOffset(0);
        setTotal(0);
        setNoResults(false);
        setSearching(false);
    };

    useEffect(() => {
        if (offset > 0 && offset < total) {
            handleSubmit();
        }
    }, [offset]);


    return (
        <>
            <div
                id="podcast-search"
                className="input-group input-group-sm w-100 mb-2"
            >
                <input
                    placeholder="I want to listen to..."
                    type="search"
                    onInput={handleInput}
                    onKeyDown={handleKey}
                    value={state.podcasts.search.term}
                    className="form-control form-control-sm bg-dark"
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-sm btn-dark"
                >
                    <SearchIcon height="14" />
                </button>
                {(state.podcasts.search.results.length > 0 ||
                    state.podcasts.search.term.length > 0) && (
                    <button
                        type="submit"
                        onClick={handleClear}
                        style={{ borderLeft: 0 }}
                        className="btn btn-sm btn-dark"
                    >
                        <TrashIcon height="14" />
                    </button>
                )}
            </div>

            {searching && (
                <BarLoader className="my-4" color="#36d7b7" width="100%" />
            )}

            {noResults && (
                <div className="alert alert-secondary mt-2" role="alert">
                    <i className="bi bi-search me-2"></i> No results found for
                    "<strong>{state.podcasts.search.term}</strong>"
                </div>
            )}

            <PodcastSearchResults />

            {state.podcasts.search.results.length > 0 && offset < total && (
				<button tabIndex="-1" className="load-more font-weight-bold text-success" onClick={loadMore}>Load More!</button>
            )}

        </>
    );
};

export default PodcastSearchInput;
