import React, { Suspense, lazy, useReducer, useMemo, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SopranoReducer } from './SopranoReducer';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Player from './Player';
import Backdrop from './Backdrop';
import { BarLoader } from 'react-spinners';

const Home = lazy(() => import('./Home'));
const Search = lazy(() => import('./Search'));
const Playlist = lazy(() => import('./Playlist'));
const Radio = lazy(() => import('./Radio'));
const Library = lazy(() => import('./Library'));

export const SopranoContext = React.createContext();

const initialState = {
    user: null,
    mode: null,
    track: {},
    status: 'idle',
    searchResults: [],
    playlistIndex: null,
    playlist: [],
    playlists: [],
};

const Soprano = () => {
    const [state, dispatch] = useReducer(SopranoReducer, initialState);
    const audioRef = useRef(null);

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
                    <Backdrop />
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
                <Player audioRef={audioRef} />
                <audio ref={audioRef} id="audio" src={trackUrl} />
            </Router>
        </SopranoContext.Provider>
    );
};

export default Soprano;
