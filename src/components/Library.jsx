import { useState, useContext } from 'react';
import LibraryActions from './LibraryActions';
import Playlists from './Playlists';
import Artists from './Artists';
import Albums from './Albums';
import Genres from './Genres';
import { SopranoContext } from './Soprano';

const Library = () => {
    const { state, dispatch } = useContext(SopranoContext);
    const [content, setContent] = useState('playlists');

    const handleOnClickActions = (e) => {
        const target = e.currentTarget.id;
        setContent(target);
    };

    return (
        <>
            <h2 className="header">Library</h2>
            <LibraryActions onClick={handleOnClickActions} />
            {content === 'playlists' && <Playlists />}
            {content === 'artists' && <Artists artists={state.music.artists} />}
            {content === 'albums' && <Albums albums={state.music.albums} />}
            {content === 'genres' && <Genres genres={state.music.genres} />}
        </>
    );
};

export default Library;
