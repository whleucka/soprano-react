import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Menu from './Menu';
import Player from './Player';
import { BarLoader } from "react-spinners";

const Home = lazy(() => import('./Home'));
const Music = lazy(() => import('./Music'));
const Playlists = lazy(() => import('./Playlists'));
const Podcasts = lazy(() => import('./Podcasts'));

const Soprano = () => {
    return (
        <Router>
            <section id="content" className="d-flex">
                <Sidebar />
                <section id="main">
                    <Menu />
                    <section id="view">
                        <Suspense fallback={<BarLoader className="my-3" width="100%" color="#36d7b7" />}>
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/music" element={<Music />} />
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
        </Router>
    );
};

export default Soprano;
