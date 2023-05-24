import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Playlist from './Playlist';
import Search from './Search';
// import Liked from './Liked';
import AudioController from './AudioController';
import { useRef } from 'react';
import Sidebar from './Sidebar';
import Player from './Player';

const Layout = () => {
    const audio = useRef(null);

    return (
        <section id="soprano">
            <div id="inner" className="d-flex">
                <Router>
                    <AudioController audio={audio} />
                    <Sidebar />
                    <div id="main-content">
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route
                                exact
                                path="/playlist"
                                element={<Playlist />}
                            />
                            <Route exact path="/search" element={<Search />} />
                            {/* <Route exact path="/liked" element={<Liked />} /> */}
                        </Routes>
                    </div>
                </Router>
            </div>
            <Player />
        </section>
    );
};

export default Layout;
