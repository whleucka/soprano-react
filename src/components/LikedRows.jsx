import { useContext } from "react";
import MD5Cover from "./MD5Cover";
import TitleArtist from "./TitleArtist";
import TrackRow from "./TrackRow";
import { SopranoContext } from './Soprano';

const LikedRows = (props) => {
  const { dispatch } = useContext(SopranoContext);
  const { tracks } = props;
  return tracks.map((track) => {
    const image = <MD5Cover md5={track.md5} size={[60, 60]} />;
    const title = <TitleArtist title={track.title} artist={track.artist} />;
    const handleTitleClick = () => {
      dispatch({ type: 'setPlayer', payload: { src: track.src, cover: track.cover } });
    };
    return <TrackRow key={track.id} image={image} title={title} playtime={track.playtime_string} handleTitleClick={handleTitleClick} />
  });
};

export default LikedRows;
