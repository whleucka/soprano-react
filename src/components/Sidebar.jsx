import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav id="sidebar">
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/music">
                    <li>Music</li>
                </Link>
                <Link to="/playlists">
                    <li>Playlists</li>
                </Link>
                <Link to="/podcasts">
                    <li>Podcasts</li>
                </Link>
            </ul>
        </nav>
    );
};

export default Sidebar;
