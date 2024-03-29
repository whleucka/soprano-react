import { useContext } from 'react';
import { Info as InfoIcon, Link as LinkIcon } from 'react-feather';
import { Link } from 'react-router-dom';
import { SopranoContext } from './Soprano';

const Home = () => {
    const { state } = useContext(SopranoContext);
    const greeting = 'Hello';
    return (
        <>
            <h2 className="header">{greeting}</h2>
            <div className="alert alert-warning my-3" role="alert">
                <span style={{ color: '#ff0000' }}>
                    <InfoIcon size="14" />{' '}
                    <strong>Early development build</strong>
                </span>
                <p className="mt-3">New features are coming soon!</p>
                <Link style={{ color: '#333' }} to="/search">
                    <LinkIcon size="14" /> Got it, take me to the music
                </Link>
            </div>
        </>
    );
};

export default Home;
