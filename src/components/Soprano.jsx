import React, { Suspense, lazy, useReducer, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SopranoReducer } from './SopranoReducer';
import Sidebar from './Sidebar';
import Menu from './Menu';
import Navbar from './Navbar';
import Player from './Player';
import { BarLoader } from 'react-spinners';

const Home = lazy(() => import('./Home'));
const Search = lazy(() => import('./Search'));
const Playlist = lazy(() => import('./Playlist'));
const Library = lazy(() => import('./Library'));
const Podcasts = lazy(() => import('./Podcasts'));

export const SopranoContext = React.createContext();

const initialState = {
    user: null,
    track: null,
    status: 'idle',
    searchResults: [],
    playlistIndex: 0,
    playlist: [],
    playlists: []
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
                                        path="/search"
                                        element={<Search />}
                                    />
                                    {state.user &&
                                        <>
                                            <Route
                                                exact
                                                path="/playlist"
                                                element={<Playlist />}
                                            />
                                            <Route
                                                exact
                                                path="/library"
                                                element={<Library />}
                                            />
                                        </>
                                    }
                                </Routes>
                            </Suspense>
                        </section>
                    </section>
                </section>
                <Player />
                <audio id="audio" src={track_url} autoPlay />
            </Router>
        </SopranoContext.Provider>
    );
};

export default Soprano;
