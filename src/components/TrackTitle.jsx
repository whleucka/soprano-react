const TrackTitle = ({ title, artist }) => {
    return (
        <div className="track-title d-flex flex-column ps-3">
            <span id="title" className="truncate">
                {title}
            </span>
            <span id="artist" className="truncate">
                {artist}
            </span>
        </div>
    );
};

export default TrackTitle;
