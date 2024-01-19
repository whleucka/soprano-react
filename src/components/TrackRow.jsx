import TrackDropdown from "./TrackDropdown";

const TrackRow = (props) => {
    const { image, track, id = null } = props;
    return (
        <div tabIndex="-1" id={'playlist-row-' +id} className="track-row d-flex align-items-center w-100">
            <div className="image">{image}</div>
            <div
                onClick={props.handleTitleClick}
                className="px-1 flex-grow-1 w-100"
            >
                <div className="title truncate"><strong>{track.title}</strong></div>
                <div className="artist truncate">{track.artist}</div>
            </div>
            <TrackDropdown playtime={track.playtime_string} />
        </div>
    );
};

export default TrackRow;
