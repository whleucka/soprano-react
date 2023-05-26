import { useContext, useState } from 'react';
import { Search as SearchIcon, Trash as TrashIcon } from 'react-feather';
import API from './API';
import { SopranoContext } from './Soprano';
import { Util } from './Util';

const PodcastSearchInput = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const [offset, setOffset] = useState(0);
    const [sortByDate, setSortByDate] = useState(1);

    const handleInput = (e) => {
        const term = e.currentTarget.value;
        dispatch({ type: 'setPodcastSearchTerm', payload: term})
    };

    const handleKey = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        } else if (e.keyCode === 27) {
            handleClear();
        }
    };

    const handleSubmit = () => {
        const term = state.podcasts.search.term.trim();
        if (term.length > 0) {
            API.podcastSearch(term, sortByDate, offset)
                .then((res) => {
                    let podcasts = [];
                    res.results.forEach((track, i) => {
                        const podcast = {
                            md5: i + '_podcast',
                            artist: track.podcast.title_original,
                            album: 'Soprano Podcast',
                            title: track.title_original,
                            cover: track.image,
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
                        payload: podcasts
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleClear = () => {
        dispatch({ type: 'setPodcastSearchResults', payload: [] });
        dispatch({ type: 'setPodcastSearchTerm', payload: "" });
    };

    return (
        <div id="podcast-search" className="input-group input-group-sm w-100 mb-2">
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
            {(state.podcasts.search.results.length > 0 || state.podcasts.search.term.length > 0) && (
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
    );
};

export default PodcastSearchInput;
