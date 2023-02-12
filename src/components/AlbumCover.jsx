import { Link } from 'react-router-dom';

const AlbumCover = ({ cover }) => {
    return <Link to="/now-playing"><img className="cover" src={cover} alt="cover art" loading="lazy" /></Link>;
};

export default AlbumCover;
