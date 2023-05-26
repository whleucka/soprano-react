import { useContext } from 'react';
import TitleArtist from './TitleArtist';
import TrackRow from './TrackRow';
import { SopranoContext } from './Soprano';
import Playtime from './Playtime';
import AlbumCover from './AlbumCover';
import CoverSize from './CoverSize';

const TrackRows = (props) => {
    const { state, dispatch } = useContext(SopranoContext);
    const { tracks, mode } = props;
    return tracks.map((track, i) => {
        const image =
            state.mode === 'podcast' ? (
                <AlbumCover cover={track.cover} />
            ) : (
                <CoverSize md5={track.md5} size={[70, 70]} />
            );
        const title = <TitleArtist title={track.title} artist={track.artist} />;
        const playtime = <Playtime playtime={track.playtime_string} />;
        const handleTitleClick = () => {
            dispatch({ type: 'setTrack', payload: track });
            mode === 'playlist' &&
                dispatch({ type: 'setPlaylistIndex', payload: i });
        };
        return (
            <TrackRow
                key={track.id}
                image={image}
                title={title}
                playtime={playtime}
                handleTitleClick={handleTitleClick}
            />
        );
    });
};

export default TrackRows;
