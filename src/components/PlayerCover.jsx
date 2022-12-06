import { useContext } from "react";
import { SopranoContext } from "./Soprano";

const PlayerCover = () => {
    const { state } = useContext(SopranoContext);
    const cover_url = state.track
        ? state.track.cover
        : process.env.REACT_APP_SERVER_URL + '/img/no-album.png';
    const title = state.track
        ? state.track.title
        : 'No Title';
    const artist = state.track
        ? state.track.artist
        : 'No Artist';
    return (
        <div className="d-flex align-items-center h-100">
            <img id="player-cover" src={cover_url} alt="cover art" />
            <div className="d-flex flex-column ps-3">
                <span id="title" className="truncate">{title}</span>
                <span id="artist" className="truncate">{artist}</span>
            </div>
        </div>
    );
}

export default PlayerCover;

