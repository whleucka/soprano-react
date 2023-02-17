import { useContext, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'react-feather';
import { SopranoContext } from './Soprano';
import { Link } from 'react-router-dom';
import CoverSize from './CoverSize';

const NowPlaying = () => {
    const { state } = useContext(SopranoContext);
    const track = state.track;

    const activePlay = state.status === 'playing' ? ' active' : '';
    const disabledPlay = Object.keys(track).length === 0 ? ' disabled' : '';

    useEffect(() => {
        document.getElementById('player').style.display = 'none';
        document.querySelector('div#progress-cont').style.position = 'fixed';
        document.querySelector('.progress').style.height = '14px';
        if (window.innerWidth > 575) {
            document.getElementById('sidebar').style.display = 'none';
        }
        return () => {
            document.getElementById('player').style.display = 'block';
            document.querySelector('div#progress-cont').style.position =
                'relative';
            document.querySelector('.progress').style.height = '8px';
            if (window.innerWidth > 575) {
                document.getElementById('sidebar').style.display = 'block';
            }
        };
    }, []);

    const link = state.playlist.length > 0 ? '/playlist' : '/search';

    return (
        <section id="now-playing" className="h-100 w-100">
            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
                <Link to={link}>
                    <CoverSize md5={track.md5} size={[320, 320]} />
                </Link>
                <div
                    id="track-info"
                    className="text-center"
                    style={{ width: '80%' }}
                >
                    <div id="title" className="truncate">
                        {state.track.title}
                    </div>
                    <div id="artist" className="truncate text-secondary">
                        {state.track.artist}
                    </div>
                </div>
                <div
                    id="player-controls"
                    className="mt-5 d-flex align-items-center justify-content-center"
                >
                    <button
                        id="now-playing-prev"
                        onClick={(e) => {
                            document.querySelector('#skip-backward').click();
                        }}
                        className="btn btn-dark"
                    >
                        <SkipBack />
                    </button>
                    <button
                        onClick={(e) => {
                            document.querySelector('#play-pause-btn').click();
                        }}
                        id="now-playing-play"
                        className={'btn btn-dark' + disabledPlay + activePlay}
                    >
                        {state.status !== 'playing' && <Play />}
                        {state.status === 'playing' && <Pause />}
                    </button>
                    <button
                        onClick={(e) => {
                            document.querySelector('#skip-forward').click();
                        }}
                        id="now-playing-next"
                        className="btn btn-dark"
                    >
                        <SkipForward />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NowPlaying;
