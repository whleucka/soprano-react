import { useNavigate, useLocation } from 'react-router-dom';
import MusicSearch from './MusicSearch';

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav id="menu">
            {/*
            <div id="navigation-buttons">
                <button onClick={() => navigate(-1)}>
                    <img src="/img/chevron_left.svg" alt="Go back" />
                </button>
                <button onClick={() => navigate(1)}>
                    <img src="/img/chevron_right.svg" alt="Go back" />
                </button>
            </div>
            */}
            {location.pathname === '/music' && <MusicSearch />}
        </nav>
    );
};

export default Menu;
