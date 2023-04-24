import { useContext } from 'react';
import MD5Cover from './MD5Cover';
import TitleArtist from './TitleArtist';
import TrackRow from './TrackRow';
import { SopranoContext } from './Soprano';
import Playtime from './Playtime';

const TrackRows = (props) => {
    const { dispatch } = useContext(SopranoContext);
    const { tracks, mode } = props;
    return tracks.map((track, i) => {
        const size = [42, 42];
        const image = <MD5Cover md5={track.md5} size={size} />;
        const title = <TitleArtist title={track.title} artist={track.artist} />;
        const playtime = <Playtime playtime={track.playtime_string} />;
        const handleTitleClick = () => {
            dispatch({ type: 'setTrack', payload: track });
            if (mode === 'playlist') {
                dispatch({ type: 'setPlaylistIndex', payload: i });
            }
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
