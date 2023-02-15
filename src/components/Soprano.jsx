import React, { Suspense, lazy, useEffect, useReducer, useMemo, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SopranoReducer } from './SopranoReducer';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Player from './Player';
import Backdrop from './Backdrop';
import { BarLoader } from 'react-spinners';
import API from './API';

const Home = lazy(() => import('./Home'));
const Search = lazy(() => import('./Search'));
const Playlist = lazy(() => import('./Playlist'));
const Radio = lazy(() => import('./Radio'));
const Podcasts = lazy(() => import('./Podcasts'));
const Library = lazy(() => import('./Library'));
const Options = lazy(() => import('./Options'));
const NowPlaying = lazy(() => import('./NowPlaying'));

export const SopranoContext = React.createContext();

const initialState = {
    user: null,
    mode: null,
    track: {},
    shuffle: true,
    status: 'idle',
    searchResults: [],
    podcastResults: [],
    playlistIndex: null,
    playlist: [],
    playlists: [],
    radio_stations: [],
};

const Soprano = () => {
    const [state, dispatch] = useReducer(SopranoReducer, initialState);
    const audioRef = useRef(null);
    const backdropRef = useRef(null);

    useEffect(() => {
        // Load radio stations
        API.radioStations()
        .then(res => {
            if (res.length > 0) {
                const radio_stations = [];
                res.forEach(station => {
                    let s = {
                        md5: station.id+"_radio",
                        artist: station.location,
                        album: "Radio",
                        title: station.station_name,
                        cover: station.cover_url,
                        playtime_seconds: 0,
                        playtime_string: null,
                        src: station.src_url
                    };
                    radio_stations.push(s);
                });
                dispatch({ type: 'setRadioStations', payload: radio_stations });
            }
        })
        .catch(err => console.log(err));
    }, []);

    const ContextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    const trackUrl = state.status === 'idle' ? '' : state.track.src;

    return (
        <SopranoContext.Provider value={ContextValue}>
            <Router>
                <Navbar />
                <section id="content" className="d-flex">
                    <Sidebar />
                    <Backdrop backdropRef={backdropRef} />
                    <section id="main">
                        <section id="view">
                            <Suspense
                                fallback={
                                    <BarLoader
                                        className="my-3"
                                        width="100%"
                                        color="#36d7b7"
                                    />
                                }
                            >
                                <Routes>
                                    <Route exact path="/" element={<Home />} />
                                    <Route
                                        exact
                                        path="/search"
                                        element={<Search />}
                                    />
                                    <Route
                                        exact
                                        path="/playlist"
                                        element={<Playlist />}
                                    />
                                    <Route
                                        exact
                                        path="/radio"
                                        element={<Radio audioRef={audioRef} />}
                                    />
                                    <Route
                                        exact
                                        path="/podcasts"
                                        element={<Podcasts />}
                                    />
                                    <Route
                                        exact
                                        path="/now-playing"
                                        element={<NowPlaying />}
                                    />
                                    {state.user && (
                                        <>
                                            <Route
                                                exact
                                                path="/library"
                                                element={<Library />}
                                            />
                                        </>
                                    )}
                                    <Route
                                        exact
                                        path="/options"
                                        element={<Options />}
                                    />
                                </Routes>
                            </Suspense>
                        </section>
                    </section>
                </section>
                <Player audioRef={audioRef} />
                <audio ref={audioRef} id="audio" src={trackUrl} />
            </Router>
        </SopranoContext.Provider>
    );
};

export default Soprano;
