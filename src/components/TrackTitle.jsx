const TrackTitle = ({title, artist}) => {
    if (!title) title = "No Title";
    if (!artist) artist = "No Artist";
    return (
        <div className="track-title d-flex flex-column ps-3">
            <span id="title" title={title} className="truncate">
                {title}
            </span>
            <span id="artist" title={artist} className="truncate">
                {artist}
            </span>
        </div>
    );
};

export default TrackTitle;
