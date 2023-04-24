import { useContext, useEffect, useState } from 'react';
import { SopranoContext } from './Soprano';
import API from './API';
import TrackRows from './TrackRows';
import { BarLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

/**
 * User liked music tracks
 * - Load the user liked music tracks on page visit
 * - Display the user liked music tracks
 * - Set the music playlist to the liked music tracks on track play
 */
const Liked = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const load = () => {
        setLoading(true);
        API.getLiked(state.user).then((liked) => {
            setLoading(false);
            dispatch({ type: 'setLiked', payload: liked });
        });
    };

    const handlePlayAll = () => {
        dispatch({ type: 'playAllLiked' });
        navigate('/playlist');
    };

    useEffect(() => {
        if (!state.music.liked.length) load();
    }, []);

    return (
        <section id="liked">
            <h2>Liked</h2>
            <div className="my-2">
                <button onClick={handlePlayAll} className="btn btn-dark">
                    Play all
                </button>
            </div>
            <div className="my-2">
                <BarLoader loading={loading} color="#36d7b7" width="100%" />
                <TrackRows tracks={state.music.liked} mode="liked" />
            </div>
        </section>
    );
};

export default Liked;
