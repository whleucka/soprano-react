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
    const handleClick = (e) => {
        if (document.getElementById('nav-toggle').ariaExpanded) {
            document.getElementById('nav-toggle').click();
        }
    };

    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to="/">
                <li onClick={handleClick} className="nav-item truncate">
                    <HomeIcon size="18" /> Home
                </li>
            </Link>
            <Link to="/search">
                <li onClick={handleClick} className="nav-item truncate">
                    <SearchIcon size="18" /> Search
                </li>
            </Link>
            <Link to="/playlist">
                <li onClick={handleClick} className="nav-item truncate">
                    <MusicIcon size="18" /> Playlist
                </li>
            </Link>
            {state.user &&
                <>
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
