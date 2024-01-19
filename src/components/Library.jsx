import { useState, useContext } from 'react';
import Playlists from './Playlists';

const Library = () => {
    const [content, setContent] = useState('playlists');

    return (
        <>
            <h2 className="header">Library</h2>
            {content === 'playlists' && <Playlists />}
        </>
    );
};

export default Library;
