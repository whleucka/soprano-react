import API from './API';
import { Heart as HeartIcon } from 'react-feather';
import { SopranoContext } from './Soprano';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LikedSongs = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const [likedSongs, setLikedSongs] = useState(0);
    const navigate = useNavigate();

    const handleLikedPlaylist = () => {
        API.getLikedPlaylist(state.user)
            .then((res) => {
                dispatch({ type: 'setPlaylist', payload: res });
                //dispatch({ type: 'setPlaylistIndex', payload: 0 });
                dispatch({ type: 'setPlaylistId', payload: 'like' });
                navigate('/');
            })
            .catch(console.log);
    };

    useEffect(() => {
        API.getLikeCount(state.user)
            .then((res) => setLikedSongs(res))
            .catch(console.log);
    }, []);
	return (
		<div
			role="button"
			onClick={handleLikedPlaylist}
			className="rounded gradient-fire cursor-pointer library-playlist-cont"
		>
			<p id="liked-songs-title">
				<HeartIcon /> Liked Songs
			</p>
			<br />
			<p>
				<small>{likedSongs} liked songs</small>
			</p>
		</div>
	);
};

export default LikedSongs;
