import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import AlbumCover from './AlbumCover';
import CoverSize from './CoverSize';
import LikeButton from './LikeButton';
import TrackDropdown from "./TrackDropdown";

const TrackRows = (props) => {
    const { state, dispatch } = useContext(SopranoContext);
    const { tracks, mode } = props;
    return tracks.map((track, i) => {
        let like_button = (props.mode === "playlist" || props.mode === "search") && state.user
            ? <LikeButton track={track} />
            : null;
        const image =
            props.mode === 'podcast' || props.mode === 'radio' ? (
                <AlbumCover cover={track.cover} />
            ) : (
                <CoverSize md5={track.md5} size={[70, 70]} />
            );
        const handleClick = () => {
            dispatch({ type: 'setMode', payload: props.mode });
            dispatch({ type: 'setTrack', payload: track });
            mode === 'playlist' &&
                dispatch({ type: 'setPlaylistIndex', payload: i });
        };
        // TODO refactor TrackRow
        return (
            <div tabIndex="-1" id={'track-row-' +i} title={track.artist + " - " + track.title} className="track-row pointer d-flex justify-content-center align-items-center w-100" key={i}>
                { like_button }
                <div className="image">
                    { (props.mode === 'podcast' || props.mode === 'radio') && (
                        <div className="mb-2">{image}</div>
                    )}
                    { !(props.mode === 'podcast' || props.mode === 'radio') && (
                        <div className="mb-2"><TrackDropdown image={image} track={track} /></div>
                    )}
                </div>
                <div className="flex-grow-1 truncate px-2" onClick={handleClick}>
                    <div className="truncate title">{track.title}</div>
                    <div className="truncate artist">{track.artist}</div>
                </div>
                <div className="playtime">
                    {track.playtime_string}
                </div>
            </div>
        );
    });
};

export default TrackRows;
