import React, {
    Suspense,
    lazy,
    useEffect,
    useReducer,
    useMemo,
    useState,
    useRef
} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SopranoReducer } from './SopranoReducer';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Player from './Player';
import Backdrop from './Backdrop';
import { BarLoader } from 'react-spinners';
import API from './API';
import { useLocalStorage } from './useLocalStorage';

const Home = lazy(() => import('./Home'));
const Search = lazy(() => import('./Search'));
const Playlist = lazy(() => import('./Playlist'));
const Radio = lazy(() => import('./Radio'));
const Podcasts = lazy(() => import('./Podcasts'));
const Library = lazy(() => import('./Library'));
const Options = lazy(() => import('./Options'));
const NowPlaying = lazy(() => import('./NowPlaying'));
const SignIn = lazy(() => import('./SignIn'));
const SignOut = lazy(() => import('./SignOut'));

export const SopranoContext = React.createContext();

const initialState = {
    user: null,
    mode: null,
    track: {},
    shuffle: true,
    repeat: false,
    status: 'idle',
    searchResults: [],
    podcastResults: [],
    playlistIndex: null,
    playlistId: null,
    playlist: [],
    playlists: [],
    radioStations: []
};

const Soprano = () => {
    const [state, dispatch] = useReducer(SopranoReducer, initialState);
    const [trackUrl, setTrackUrl] = useState('');
    const audioRef = useRef(null);
    const backdropRef = useRef(null);
    const [user] = useLocalStorage('uuid', '');

    useEffect(() => {
        // Load user, if possible
        if (user) {
            API.loadUser(user)
                .then((res) => {
                    dispatch({ type: 'setUser', payload: res.uuid });
                })
                .catch(console.log);
        }

        // Load radio stations
        API.radioStations()
            .then((res) => {
                if (res.length > 0) {
                    const stations = [];
                    res.forEach((station) => {
                        const cover = station.cover_url
                            ? station.cover_url
                            : '/img/no-album.png';
                        const location = station.location
                            ? station.location
                            : 'Internet';
                        let s = {
                            md5: station.id + '_radio',
                            artist: location,
                            album: 'Soprano Radio',
                            title: station.station_name,
                            cover,
                            playtime_seconds: 0,
                            playtime_string: null,
                            src: station.src_url
                        };
                        stations.push(s);
                    });
                    dispatch({
                        type: 'setRadioStations',
                        payload: stations
                    });
                }
            })
            .catch(console.log);
    }, [user]);

    useEffect(() => {
        if (typeof state.track.src !== 'undefined' && state.mode !== 'radio') {
            setTrackUrl(state.track.src);
        }
    }, [state.track.src]);

    const ContextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

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
                                    <Route
                                        exact
                                        path="/sign-in"
                                        element={<SignIn />}
                                    />
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
                                            <Route
                                                exact
                                                path="/sign-out"
                                                element={<SignOut />}
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
                <audio
                    ref={audioRef}
                    id="audio"
                    src={trackUrl}
                    autoPlay
                />
            </Router>
        </SopranoContext.Provider>
    );
};

export default Soprano;
