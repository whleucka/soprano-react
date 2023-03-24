const LibraryActions = ({ onClick }) => {
    return (
        <div className="actions" id="library-actions">
            <button onClick={onClick} id="playlists" className="btn btn-sm btn-dark">Playlists</button>
            <button onClick={onClick} id="artists" className="btn btn-sm btn-dark">Artists</button>
            <button onClick={onClick} id="albums" className="btn btn-sm btn-dark">Albums</button>
            <button onClick={onClick} id="genres" className="btn btn-sm btn-dark">Genres</button>
        </div>
    );
};

export default LibraryActions;
