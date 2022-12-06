import { Link } from 'react-router-dom';

const SidebarLinks = () => {
    return (
        <ul>
            <Link to="/">
                <li className="truncate">Home</li>
            </Link>
            <Link to="/music">
                <li className="truncate">Music</li>
            </Link>
            <Link to="/podcasts">
                <li className="truncate">Podcasts</li>
            </Link>
        </ul>
    )
}

export default SidebarLinks;
