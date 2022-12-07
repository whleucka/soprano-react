import {
    Home as HomeIcon,
    Search as SearchIcon,
    List as ListIcon
} from 'react-feather';
import { Link } from 'react-router-dom';

const NavLinks = () => {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to="/">
                <li className="nav-item truncate">
                    <HomeIcon size="18" /> Home
                </li>
            </Link>
            <Link to="/search">
                <li className="nav-item truncate">
                    <SearchIcon size="18" /> Search
                </li>
            </Link>
            <Link to="/playlist">
                <li className="nav-item truncate">
                    <ListIcon size="18" /> Playlist
                </li>
            </Link>
        </ul>
    );
};

export default NavLinks;
