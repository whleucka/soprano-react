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
                dispatch({
                    type: 'updateTrackLike',
                    mode: state.mode,
                    payload: track,
                    liked: res.like
                });
                if (state.mode === 'playlist' && !res.like) {
                    dispatch({ type: 'removeFromPlaylist', payload: track.id })
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
        <HeartIcon stroke={'#ff0000'} fill={'#ff0000'} />
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
