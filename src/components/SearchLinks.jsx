import { Link } from 'react-router-dom';
import {
    User as UserIcon,
    Search as SearchIcon,
    Disc as DiscIcon,
    Music as MusicIcon,
} from 'react-feather';

const SearchLinks = () => {
	const liClass = (path) => {
		const { pathname } = window.location;
		let className = "nav-item truncate";
		if (pathname.match(path)) {
			className += " active";
		}
		return className;
	}
	return (
        <ul className="list-inline">
            <Link to="/search">
                <li className={liClass('search')}>
                    <SearchIcon size={20} className="me-1"/> Search
                </li>
            </Link>
            <Link to="/artists">
                <li className={liClass('artists')}>
                    <UserIcon size={20} className="me-1"/> Artists
                </li>
            </Link>
            <Link to="/albums">
                <li className={liClass('albums')}>
                    <DiscIcon size={20} className="me-1"/> Albums
                </li>
            </Link>
            <Link to="/genres">
                <li className={liClass('genres')}>
                    <MusicIcon size={20} className="me-1"/> Genres
                </li>
            </Link>
		</ul>
	);
};

export default SearchLinks;
