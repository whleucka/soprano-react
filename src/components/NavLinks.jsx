import { useContext } from 'react';
import {
    Home as HomeIcon,
    Search as SearchIcon,
    Music as MusicIcon,
    Radio as RadioIcon,
    Mic as MicIcon,
    LogIn as LogInIcon,
    LogOut as LogOutIcon,
    Disc as DiscIcon
} from 'react-feather';
import { Link } from 'react-router-dom';
import { SopranoContext } from './Soprano';

const NavLinks = () => {
    const { state } = useContext(SopranoContext);
    const handleClick = () => {
        if (document.getElementById('nav-toggle').ariaExpanded === 'true') {
            document.getElementById('nav-toggle').click();
        }
    };

    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to="/">
                <li onClick={handleClick} className="nav-item truncate">
                    <MusicIcon size="18" /> Playlist
                </li>
            </Link>
            <Link to="/search">
                <li onClick={handleClick} className="nav-item truncate">
                    <SearchIcon size="18" /> Search
                </li>
            </Link>
            {state.user && (
                <Link onClick={handleClick} to="/library">
                    <li className="nav-item truncate">
                        <DiscIcon size="18" /> Library
                    </li>
                </Link>
            )}
            <Link to="/radio">
                <li onClick={handleClick} className="nav-item truncate">
                    <RadioIcon size="18" /> HD Radio
                </li>
            </Link>
            <Link to="/podcasts">
                <li onClick={handleClick} className="nav-item truncate">
                    <MicIcon size="18" /> Podcasts
                </li>
            </Link>
            {state.user && (
                <Link to="/sign-out">
                    <li onClick={handleClick} className="nav-item truncate">
                        <LogOutIcon size="18" /> Sign Out
                    </li>
                </Link>
            )}
            {!state.user && (
                <Link to="/sign-in">
                    <li onClick={handleClick} className="nav-item truncate">
                        <LogInIcon size="18" /> Sign In
                    </li>
                </Link>
            )}
        </ul>
    );
};

export default NavLinks;
