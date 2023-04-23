import { useContext } from "react";
import { SopranoContext } from "./Soprano";
import TrackRows from "./TrackRows";
import { Info as InfoIcon } from "react-feather";

/**
 * Current playlist
 * - Show track rows for state.music.playlist.tracks
 */
const Playlist = () => {
  const { state } = useContext(SopranoContext);
  return (
    <section id="playlist">
      <h2>Playlist</h2>
      <TrackRows tracks={state.music.playlist.tracks} mode="playlist" />
      {state.music.playlist.tracks.length == 0 &&
        <div className="alert alert-dark" role="alert">
          <InfoIcon className="me-1" size="0.9rem" /> Playlist is currently empty
        </div>
      }
    </section>
  );
};

export default Playlist;
