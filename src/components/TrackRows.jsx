import { useContext } from 'react';
import Cover from './Cover';
import TitleArtist from './TitleArtist';
import TrackRow from './TrackRow';
import { SopranoContext } from './Soprano';
import Playtime from './Playtime';

const TrackRows = (props) => {
    const { dispatch } = useContext(SopranoContext);
    const { tracks, mode } = props;
    return tracks.map((track, i) => {
        const image = <Cover cover={track?.cover} />;
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
