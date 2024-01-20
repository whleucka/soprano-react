import React, { Suspense, lazy, useRef, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Backdrop from './Backdrop';
import Player from './Player';
import { BarLoader } from 'react-spinners';
import { SopranoContext } from './Soprano';
import AudioController from './AudioController';
import PlayerProgress from './PlayerProgress';
import Artists from './Artists';
import Albums from './Albums';
import Genres from './Genres';
const Home = lazy(() => import('./Home'));
const Search = lazy(() => import('./Search'));
const Playlist = lazy(() => import('./Playlist'));
const Radio = lazy(() => import('./Radio'));
const Podcasts = lazy(() => import('./Podcasts'));
const Library = lazy(() => import('./Library'));
const SignIn = lazy(() => import('./SignIn'));
const SignOut = lazy(() => import('./SignOut'));
const User = lazy(() => import('./User'));

const Layout = () => {
    const { state } = useContext(SopranoContext);
    const audioRef = useRef(null);
    const backdropRef = useRef(null);
    return (
        <Router>
            <Navbar />
            <section id="content" className="d-flex">
                <Sidebar />
                <AudioController audioRef={audioRef} />
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
                                <Route
                                    exact
                                    path="/sign-in"
                                    element={<SignIn />}
                                />
                                <Route
                                    exact
                                    path="/search"
                                    element={<Search />}
                                />
                                <Route
                                    exact
                                    path="/artists"
                                    element={<Artists artists={state.music.artists} />}
                                />
                                <Route
                                    exact
                                    path="/albums"
                                    element={<Albums albums={state.music.albums} />}
                                />
                                <Route
                                    exact
                                    path="/genres"
                                    element={<Genres genres={state.music.genres} />}
                                />
                                <Route
                                    exact
                                    path="/"
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
                                {state.user && (
                                    <>
                                        <Route
                                            exact
                                            path="/library"
                                            element={<Library />}
                                        />
                                        <Route
                                            exact
                                            path="/sign-out"
                                            element={<SignOut />}
                                        />
                                    </>
                                )}
                            </Routes>
                        </Suspense>
                    </section>
                </section>
            </section>
            <PlayerProgress audioRef={audioRef} />
            <Player audioRef={audioRef} />
            <User />
        </Router>
    );
};

export default Layout;
