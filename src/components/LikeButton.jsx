import { useContext, useEffect, useState } from 'react';
import { Heart as HeartIcon,  } from 'react-feather';
import API from './API';
import { SopranoContext } from './Soprano';
const LikeButton = ({ track }) => {
    const { state } = useContext(SopranoContext);
    const [like, setLike] = useState(false);
    const toggleLike = () => {
        API.likeTrack(track.md5, state.user)
            .then(res => {
                setLike(res.like);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (track) {
            setLike(track.liked);
        }
    }, [])

    const LikeIcon = like
    ? <HeartIcon stroke={'#ff0000'} fill={'#ff0000'} />
    : <HeartIcon stroke={'#444'} />

    return <button
        className={'btn btn-like btn-dark'}
        onClick={toggleLike}
    >
        {LikeIcon}
    </button>
}

export default LikeButton;
