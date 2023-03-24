import { useContext, useEffect, useState } from "react"
import {
    Heart as HeartIcon
} from 'react-feather';
import API from "./API";
import { SopranoContext } from "./Soprano";
import { useNavigate } from 'react-router-dom';

const Playlists = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const [likedSongs, setLikedSongs] = useState(0);
    const navigate = useNavigate();

    const handleLikedPlaylist = () => {
        API.getLikedPlaylist(state.user)
            .then(res => {
                dispatch({ type: 'setMode', payload: 'playlist' });
                dispatch({ type: 'setPlaylist', payload: res });
                dispatch({ type: 'setPlaylistIndex', payload: 0 });
                navigate('/playlist');
            })
            .catch(console.log)
    }

    useEffect(() => {
        API.getLikeCount(state.user)
            .then(res => setLikedSongs(res))
            .catch(console.log)
    }, [])
    return <div id="library-playlists" className="d-flex">
        <div role="button" onClick={handleLikedPlaylist} className="rounded gradient-fire cursor-pointer library-playlist-cont">
            <p id="liked-songs-title"><HeartIcon /> Liked Songs</p>
            <br />
            <p><small>{likedSongs} liked songs</small></p>
        </div>
    </div>
}

export default Playlists;
