import { useContext } from 'react';
import {
    Home as HomeIcon,
    Search as SearchIcon,
    Disc as DiscIcon,
    Music as MusicIcon
} from 'react-feather';
import { Link } from 'react-router-dom';
import { SopranoContext } from './Soprano';

const NavLinks = () => {
    const { state } = useContext(SopranoContext);
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
            {state.user &&
                <>
                    <Link to="/playlist">
                        <li className="nav-item truncate">
                            <MusicIcon size="18" /> Playlist
                        </li>
                    </Link>
                    <Link to="/library">
                        <li className="nav-item truncate">
                            <DiscIcon size="18" /> Library
                        </li>
                    </Link>
                </>
            }
        </ul>
    );
};

export default NavLinks;
