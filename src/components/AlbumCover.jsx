import { Link } from 'react-router-dom';

const AlbumCover = ({ cover, link = false }) => {
    return (
        <>
        { link &&
            <Link to="/now-playing">
                <img className="cover" src={cover} alt="cover art" loading="lazy" />
            </Link>
        }
        { !link &&
            <img className="cover" src={cover} alt="cover art" loading="lazy" />
        }
        </>
    );
};

export default AlbumCover;
