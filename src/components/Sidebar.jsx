import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav id="sidebar">
            <ul>
                <Link to="/">
                    <li className="truncate">Home</li>
                </Link>
                <Link to="/music">
                    <li className="truncate">Music</li>
                </Link>
                <Link to="/playlists">
                    <li className="truncate">Playlists</li>
                </Link>
                <Link to="/podcasts">
                    <li className="truncate">Podcasts</li>
                </Link>
            </ul>
        </nav>
    );
};

export default Sidebar;
