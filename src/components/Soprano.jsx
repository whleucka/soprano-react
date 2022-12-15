import React, { Suspense, lazy, useReducer, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SopranoReducer } from './SopranoReducer';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Player from './Player';
import { BarLoader } from 'react-spinners';

const Home = lazy(() => import('./Home'));
const Search = lazy(() => import('./Search'));
const Playlist = lazy(() => import('./Playlist'));
const Radio = lazy(() => import('./Radio'));
const Library = lazy(() => import('./Library'));

export const SopranoContext = React.createContext();

const initialState = {
    user: null,
    track: {},
    status: 'idle',
    searchResults: [],
    playlistIndex: null,
    playlist: [],
    playlists: [],
};

const Soprano = () => {
    const [state, dispatch] = useReducer(SopranoReducer, initialState);

    const ContextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    const trackUrl = Object.keys(state.track).length > 0 && state.track.src
        ? state.track.src
        : process.env.REACT_APP_API_URL + `/music/play/${state.track.md5}`;

    const backdropImage = Object.keys(state.track).length > 0 && state.track.backdrop
        ? state.track.backdrop
        : process.env.REACT_APP_SERVER_URL + state.track.cover

    return (
        <SopranoContext.Provider value={ContextValue}>
            <Router>
                <Navbar />
                <section id="content" className="d-flex">
                    <Sidebar />
                    <section
                        style={{ backgroundImage: `url(${backdropImage})` }}
                        id="backdrop"
                    >
                        &nbsp;
                    </section>
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
                                        element={<Radio />}
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
                                </Routes>
                            </Suspense>
                        </section>
                    </section>
                </section>
                <Player />
                <audio id="audio" src={trackUrl} />
            </Router>
        </SopranoContext.Provider>
    );
};

export default Soprano;
