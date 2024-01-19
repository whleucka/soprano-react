import { Link } from 'react-router-dom';

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
                    Search
                </li>
            </Link>
            <Link to="/artists">
                <li className={liClass('artists')}>
                    Artists
                </li>
            </Link>
            <Link to="/albums">
                <li className={liClass('albums')}>
                    Albums
                </li>
            </Link>
            <Link to="/genres">
                <li className={liClass('genres')}>
                    Genres
                </li>
            </Link>
		</ul>
	);
};

export default SearchLinks;
