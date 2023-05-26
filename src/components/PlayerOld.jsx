import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import PlayerControls from './PlayerControls';
import PlayerVolume from './PlayerVolume';
import TrackTitle from './TrackTitle';
import CoverSize from './CoverSize';
import AlbumCover from './AlbumCover';
import PlayerProgress from './PlayerProgress';
import { Link } from 'react-router-dom';

const Player = ({ audioRef }) => {
    const { state } = useContext(SopranoContext);
    const track = state.track;

    const cover =
        Object.keys(track).length > 0 ? track.cover : '/img/no-album.png';
    const title = Object.keys(track).length > 0 ? track.title : null;
    const artist = Object.keys(track).length > 0 ? track.artist : null;
    return (
        <>
            <PlayerProgress audioRef={audioRef} />
            <section id="player">
                <div className="d-flex align-items-center justify-content-center h-100 w-100 ">
                    <div id="left-cover" title={'View: ' + state.track.album}>
                        {state.mode !== 'radio' && (
                            <Link to="/now-playing">
                                {state.mode === 'podcast' && (
                                    <AlbumCover cover={state.track.cover} />
                                )}
                                {state.mode !== 'podcast' && (
                                    <CoverSize
                                        md5={track.md5}
                                        size={[70, 70]}
                                    />
                                )}
                            </Link>
                        )}
                        {state.mode === 'radio' && <AlbumCover cover={cover} />}
                    </div>
                    <div id="left-track-title">
                        <TrackTitle artist={artist} title={title} />
                    </div>
                    <div id="center-controls" className="flex-grow-1">
                        <PlayerControls audioRef={audioRef} />
                    </div>
                    <div id="right-volume">
                        <PlayerVolume audioRef={audioRef} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Player;
