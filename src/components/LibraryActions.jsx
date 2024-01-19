const LibraryActions = ({ onClick }) => {
    return (
        <div className="actions" id="library-actions">
            <button
                onClick={onClick}
                id="playlists"
                className="btn btn-sm btn-dark"
            >
                Playlists
            </button>
        </div>
    );
};

export default LibraryActions;
