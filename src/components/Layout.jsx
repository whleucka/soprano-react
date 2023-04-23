import React, { useContext, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SopranoContext } from './Soprano';
import Home from './Home';
import Playlist from './Playlist';
import Search from './Search';
import Liked from './Liked';

const Layout = () => {
  const { state } = useContext(SopranoContext);
  const audio = useRef(null);

  return (
    <section id="soprano">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/playlist" element={<Playlist />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/liked" element={<Liked />} />
        </Routes>
      </Router>
      <audio ref={audio} src={state.player.src} autoPlay />
    </section>
  );
};

export default Layout;
