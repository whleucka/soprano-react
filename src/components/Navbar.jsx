import NavLinks from './NavLinks';

const Navbar = () => {
    return (
        <nav
            id="navbar"
            className="navbar navbar-expand-lg navbar-dark bg-dark"
        >
            <div className="container-fluid d-flex align-items-center p-0">
                <h5 className="navbar-brand brand">Soprano</h5>
                <button
                    id="nav-toggle"
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu"
                    aria-controls="navbarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <NavLinks />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
