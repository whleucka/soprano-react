import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';
import API from './API';
import LikedRows from './LikedRows';

/**
 * User liked music tracks
 * - Load the user liked music tracks on page visit
 * - Display the user liked music tracks
 * - Set the music playlist to the liked music tracks on track play
 */
const Liked = () => {
    const { state, dispatch } = useContext(SopranoContext);

    const load = () => {
        API.getLiked(state.user).then((liked) => {
            dispatch({ type: 'getLiked', payload: liked });
        });
    };

    const handlePlayAll = () => {
        dispatch({ type: "playAllLiked" });
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <section id="liked">
            <h3>Liked</h3>
            <div className="my-2">
                <button onClick={handlePlayAll} className="btn btn-sm btn-dark">Play all</button>
            </div>
            <LikedRows tracks={state.music.liked} />
        </section>
    );
};

export default Liked;
