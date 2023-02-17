import { Link } from 'react-router-dom';

// TODO: fix this, too many props. Radio images will need to be uploaded
// in backend server
const AlbumCover = ({ cover, link = false, md5 = null, size = null, mode = 'player' }) => {
    if (md5 && size && mode !== 'radio') {
        const width = size[0];
        const height = size[1];
        cover = process.env.REACT_APP_API_URL + `/cover/${md5}/${width}/${height}`;
    }
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
