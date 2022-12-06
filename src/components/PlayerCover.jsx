import { useContext } from 'react';
import AlbumCover from './AlbumCover';
import { SopranoContext } from './Soprano';
import TrackTitle from './TrackTitle';

const PlayerCover = () => {
    const { state } = useContext(SopranoContext);
    const cover = state.track ? state.track.cover : '/img/no-album.png';
    const title = state.track ? state.track.title : 'No Title';
    const artist = state.track ? state.track.artist : 'No Artist';
    return (
        <div className="d-flex align-items-center h-100">
            <AlbumCover cover={cover} />
            <TrackTitle title={title} artist={artist} />
        </div>
    );
};

export default PlayerCover;
