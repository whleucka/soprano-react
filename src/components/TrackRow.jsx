import { useContext } from 'react';
import { Play as PlayIcon } from 'react-feather';
import { SopranoContext } from './Soprano';
import CoverSize from './CoverSize';
import AlbumCover from './AlbumCover';
import TrackTitle from './TrackTitle';

const TrackRow = ({ track, mode, playlistIndex = null }) => {
    const { state, dispatch } = useContext(SopranoContext);
    const { artist, title, playtime_string } = track;
    const handleClick = () => {
        dispatch({ type: 'setMode', payload: mode });
        dispatch({ type: 'setTrack', payload: track });
        if (playlistIndex)
            dispatch({ type: 'setPlaylistIndex', payload: playlistIndex });
        dispatch({ type: 'setStatus', payload: 'playing' });
    };
    const buttonClass =
        state.status === 'playing' && state.track.md5 === track.md5
            ? 'active'
            : 'text-secondary';
    const trackId = playlistIndex ? 'playlist-row-' + playlistIndex : '';

    return (
        <div
            tabIndex="-1"
            id={trackId}
            className="track-row d-flex align-items-center"
        >
            <div>
                <button
                    onClick={handleClick}
                    className={buttonClass + ' play-button btn btn-dark'}
                >
                    <PlayIcon height="18" strokeWidth="2" />
                </button>
            </div>
            <div>
                {(mode === 'radio' || mode === 'podcast') && (
                    <AlbumCover cover={track.cover} />
                )}
                {mode === 'search' && (
                    <CoverSize md5={track.md5} size={[40, 40]} />
                )}
            </div>
            <div className="flex-grow-1" style={{ width: '50%' }}>
                <TrackTitle title={title} artist={artist} />
            </div>
            <div id="playtime">{playtime_string}</div>
        </div>
    );
};

export default TrackRow;
