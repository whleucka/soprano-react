import React, { Suspense, lazy, useReducer, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SopranoReducer } from './SopranoReducer';
import Sidebar from './Sidebar';
import Menu from './Menu';
import Navbar from './Navbar';
import Player from './Player';
import { BarLoader } from 'react-spinners';

const Home = lazy(() => import('./Home'));
const Music = lazy(() => import('./Music'));
const Playlists = lazy(() => import('./Playlists'));
const Podcasts = lazy(() => import('./Podcasts'));

export const SopranoContext = React.createContext();

const initialState = {
    user: null,
    track: null,
    searchResults: []
};

const Soprano = () => {
    const [state, dispatch] = useReducer(SopranoReducer, initialState);

    const ContextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    const track_url = state.track
        ? process.env.REACT_APP_API_URL + `/music/play/${state.track.md5}`
        : null;

    return (
        <SopranoContext.Provider value={ContextValue}>
            <Router>
                <Navbar />
                <section id="content" className="d-flex">
                    <Sidebar />
                    <section id="main">
                        <Menu />
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
                                        path="/music"
                                        element={<Music />}
                                    />
                                    <Route
                                        exact
                                        path="/playlists"
                                        element={<Playlists />}
                                    />
                                    <Route
                                        exact
                                        path="/podcasts"
                                        element={<Podcasts />}
                                    />
                                </Routes>
                            </Suspense>
                        </section>
                    </section>
                </section>
                <Player />
                <audio src={track_url} autoPlay preload />
            </Router>
        </SopranoContext.Provider>
    );
};

export default Soprano;
