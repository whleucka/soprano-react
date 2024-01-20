import React, { useEffect, useReducer, useMemo } from 'react';
import { SopranoReducer } from './SopranoReducer';
import { InitialState } from './InitialState';
import Layout from './Layout';
import API from './API';

export const SopranoContext = React.createContext();

const Soprano = () => {
    const [state, dispatch] = useReducer(SopranoReducer, InitialState);

    const ContextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    useEffect(() => {
        // Pre-load some data
        if (!state.radio.stations.length) {
            API.radioStations().then((res) => {
                if (res.length > 0) {
                    const stations = [];
                    res.forEach((station) => {
                        const cover = station.cover_url
                            ? process.env.REACT_APP_SERVER_URL + '/api/v1/image?url=' + station.cover_url
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
            });
        }
        if (!state.music.albums.albums.length) {
            API.getAlbums(1).then((res) => {
                dispatch({
                    type: 'setAlbumResults',
                    payload: res
                });
            }).catch((err) => {
                console.log(err);
            });
        }
        if (!state.music.artists.artists.length) {
            API.getArtists(1).then((res) => {
                dispatch({
                    type: 'setArtistsResults',
                    payload: res
                });
            }).catch((err) => {
                console.log(err);
            });
        }
        if (!state.music.genres.genres.length) {
            API.getGenres(1).then((res) => {
                dispatch({
                    type: 'setGenresResults',
                    payload: res
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    }, []);

    return (
        <SopranoContext.Provider value={ContextValue}>
            <Layout />
        </SopranoContext.Provider>
    );
};

export default Soprano;
