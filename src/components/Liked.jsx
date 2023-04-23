import { useContext, useEffect, useState } from 'react';
import { SopranoContext } from './Soprano';
import API from './API';
import LikedRows from './LikedRows';
import { BarLoader } from 'react-spinners';

/**
 * User liked music tracks
 * - Load the user liked music tracks on page visit
 * - Display the user liked music tracks
 * - Set the music playlist to the liked music tracks on track play
 */
const Liked = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const [ loading, setLoading ] = useState(false);

    const load = () => {
        setLoading(true);
        API.getLiked(state.user).then((liked) => {
            setLoading(false);
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
            <BarLoader loading={loading} color="#36d7b7"  width="100%" />
            <LikedRows tracks={state.music.liked} />
        </section>
    );
};

export default Liked;
