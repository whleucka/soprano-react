import { useContext } from 'react';
import { Play as PlayIcon } from 'react-feather';
import AlbumCover from './AlbumCover';
import { SopranoContext } from './Soprano';
import TrackTitle from './TrackTitle';

const TrackRow = ({ track }) => {
    const { dispatch } = useContext(SopranoContext);
    const { cover, artist, album, title, playtime_string, md5 } = track;
    const handleClick = (e) => {
        dispatch({ type: 'setTrack', payload: track });
    };

    return (
        <div className="track-row d-flex align-items-center">
            <div>
                <button
                    onClick={handleClick}
                    className="play-button btn btn-dark"
                >
                    <PlayIcon height="18" />
                </button>
            </div>
            <div>
                <AlbumCover cover={cover} />
            </div>
            <div className="flex-grow-1" style={{ width: '50%' }}>
                <TrackTitle title={title} artist={artist} />
            </div>
            <div id="playtime">{playtime_string}</div>
        </div>
    );
};

export default TrackRow;
