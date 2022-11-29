import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();

    return <nav id="navbar">
        <div id="navigation-buttons">
            <button onClick={() => navigate(-1)}><img src="/img/chevron_left.svg" alt="Go back" /></button>
            <button onClick={() => navigate(1)}><img src="/img/chevron_right.svg" alt="Go back" /></button>
        </div>
    </nav>;
};

export default Menu;
