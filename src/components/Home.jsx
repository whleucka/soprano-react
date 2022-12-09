import { Info as InfoIcon, Search as SearchIcon, Link as LinkIcon } from "react-feather";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <h2 className="header">Hello</h2>
            <div className="alert alert-warning my-3" role="alert">
                <span style={{color: "#ff0000"}}><InfoIcon size="14" /> <strong>Early development build</strong></span><br />
                <br />
                Some features are missing or unstable. Things could get a bit weird! Check back later for a stable build.<br />
                <br />
                <Link style={{color: "#333"}} to="/search">
                <LinkIcon size="14" /> Got it, take me to the music
                </Link>
            </div>
        </>
    );
};

export default Home;
