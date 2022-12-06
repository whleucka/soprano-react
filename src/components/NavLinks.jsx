import { Link } from 'react-router-dom';

const NavLinks = () => {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to="/">
                <li className="nav-item truncate">Home</li>
            </Link>
            <Link to="/music">
                <li className="nav-item truncate">Music</li>
            </Link>
        </ul>
    );
};

export default NavLinks;
