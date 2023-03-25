import { useContext, useState } from 'react';
import { SopranoContext } from './Soprano';
import CoverSize from './CoverSize';
import AlbumCover from './AlbumCover';
import TrackTitle from './TrackTitle';
import LikeButton from './LikeButton';

const TrackRow = ({ track, mode, playlistIndex = null }) => {
    const { state, dispatch } = useContext(SopranoContext);
    const { artist, title, playtime_string } = track;
    const handleSetTrack = () => {
        dispatch({ type: 'setMode', payload: mode });
        dispatch({ type: 'setTrack', payload: track });
        if (playlistIndex !== null)
            dispatch({ type: 'setPlaylistIndex', payload: playlistIndex });
        dispatch({ type: 'setStatus', payload: 'playing' });
    };
    const buttonClass =
        state.status === 'playing' && state.track.md5 === track.md5
            ? 'active'
            : 'text-secondary';
    const trackId =
        playlistIndex !== null ? 'playlist-row-' + playlistIndex : '';

    return (
        <div
            tabIndex="-1"
            id={trackId}
            className="track-row d-flex align-items-center"
        >
            <div>
                {state.user && (mode === 'search' || mode === 'playlist') && (
                    <LikeButton track={track} />
                )}
            </div>
            <div role="button" onClick={handleSetTrack}>
                {(mode === 'radio' || mode === 'podcast') && (
                    <AlbumCover cover={track.cover} />
                )}
                {(mode === 'search' || mode === 'playlist') && (
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
