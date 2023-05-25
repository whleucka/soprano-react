import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav id="sidebar">
            <ul className="navbar-nav">
                <Link to="/">
                    <li className="nav-item">Home</li>
                </Link>
                <Link to="/playlist">
                    <li className="nav-item">Playlist</li>
                </Link>
                <Link to="/search">
                    <li className="nav-item">Search</li>
                </Link>
            </ul>
        </nav>
    );
};

export default Sidebar;
