import { useState } from 'react';
import LibraryActions from './LibraryActions';
import Playlists from './Playlists';

const Library = () => {
    const [content, setContent] = useState('playlists');

    const handleOnClickActions = (e) => {
        const target = e.currentTarget.id;
        setContent(target);
    };

    return (
        <>
            <h2 className="header">Library</h2>
            <LibraryActions onClick={handleOnClickActions} />
            {content == 'playlists' && <Playlists />}
            {content == 'artists' && <div>artists</div>}
            {content == 'albums' && <div>albums</div>}
            {content == 'genres' && <div>genres</div>}
        </>
    );
};

export default Library;
