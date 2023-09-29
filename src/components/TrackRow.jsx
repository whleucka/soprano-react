const TrackRow = (props) => {
    const { image, title, playtime, id = null } = props;
    return (
        <div tabIndex="-1" id={'playlist-row-' +id} className="track-row d-flex align-items-center w-100">
            <div className="image">{image}</div>
            <div
                onClick={props.handleTitleClick}
                className="title flex-grow-1 truncate"
            >
                {title}
            </div>
            <div className="playtime">{playtime}</div>
        </div>
    );
};

export default TrackRow;
