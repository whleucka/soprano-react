import { useContext, useEffect, useState } from 'react';
import { Heart as HeartIcon } from 'react-feather';
import API from './API';
import { SopranoContext } from './Soprano';

const LikeButton = ({ track }) => {
    const { state, dispatch } = useContext(SopranoContext);
    const [like, setLike] = useState(false);
    const toggleLike = () => {
        API.likeTrack(track.md5, state.user)
            .then((res) => {
                setLike(res.like);
                if (state.music.playlist.tracks.length > 0) {
                    if (res.like) {
                        track.liked = true;
                        dispatch({ type: 'addToPlaylist', payload: track });
                    } else {
                        track.liked = false;
                        dispatch({
                            type: 'removeFromPlaylist',
                            payload: track
                        });
                    }
                }
            })
            .catch(console.log);
    };

    useEffect(() => {
        if (track) {
            setLike(track.liked);
        }
    }, [track]);

    const LikeIcon = like ? (
        <HeartIcon stroke={'#F06292'} fill={'#F06292'} />
    ) : (
        <HeartIcon stroke={'#444'} />
    );

    return (
        <button className={'btn btn-like btn-dark'} onClick={toggleLike}>
            {LikeIcon}
        </button>
    );
};

export default LikeButton;
