import { useLocation } from 'react-router-dom';
import HomeActions from './HomeActions';
import LibraryActions from './LibraryActions';
import MusicSearch from './MusicSearch';
import PlaylistActions from './PlaylistActions';

const Menu = () => {
    const location = useLocation();

    return (
        <nav id="menu">
            {location.pathname === '/' && <HomeActions />}
            {location.pathname === '/search' && <MusicSearch />}
            {location.pathname === '/playlist' && <PlaylistActions />}
            {location.pathname === '/library' && <LibraryActions />}
        </nav>
    );
};

export default Menu;
