import { useContext, useEffect } from 'react';
import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Shuffle,
    Repeat
} from 'react-feather';
import { SopranoContext } from './Soprano';
import { Link } from 'react-router-dom';
import CoverSize from './CoverSize';
import AlbumCover from './AlbumCover';

const NowPlaying = () => {
    const { dispatch, state } = useContext(SopranoContext);
    const track = state.track;

    const activePlay = state.status === 'playing' ? ' active' : '';
    const disabledPlay = Object.keys(track).length === 0 ? ' disabled' : '';

    useEffect(() => {
        document.getElementById('player').style.display = 'none';
        document.querySelector('div#progress-cont').style.position = 'fixed';
        document.querySelector('.progress').style.height = '14px';
        document.getElementById('backdrop').style.height = '100%';
        if (window.innerWidth > 575) {
            document.getElementById('sidebar').style.display = 'none';
        }
        return () => {
            document.getElementById('backdrop').style.height = '100%';
            document.getElementById('player').style.display = 'block';
            document.querySelector('div#progress-cont').style.position =
                'relative';
            document.querySelector('.progress').style.height = '8px';
            document.getElementById('backdrop').style.height = 'calc(100% - 98px)';
            if (window.innerWidth > 575) {
                document.getElementById('sidebar').style.display = 'block';
            }
        };
    }, []);

    let link = '/search';
    if (state.mode === 'playlist') {
        link = '/playlist';
    } else if (state.mode == 'podcast') {
        link = '/podcasts';
    }

    const toggleShuffle = () => {
        dispatch({ type: 'toggleShuffle', payload: !state.shuffle });
    };

    const toggleRepeat = () => {
        dispatch({ type: 'toggleRepeat', payload: !state.repeat });
    };

    const disabledNextPrev = state.playlist.length === 0 ? ' disabled' : '';
    const shuffleStyle = state.shuffle ? 'active' : 'inactive';
    const repeatStyle = state.repeat ? 'active' : 'inactive';

    const buttonAnimate = (e) => {
        return new Promise((resolve) => {
            console.log(e.currentTarget.classList);
            e.currentTarget.classList.add('active');
            setTimeout(() => {
                resolve()
            }, 250);
        })
    }

    return (
        <section id="now-playing" className="h-100 w-100">
            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
                <Link to={link}>
                    {state.mode === 'podcast' && (
                        <AlbumCover cover={track.cover} />
                    )}
                    {state.mode !== 'podcast' && (
                        <CoverSize md5={track.md5} size={[280, 280]} />
                    )}
                </Link>
                <div
                    id="track-info"
                    className="text-center"
                    style={{ width: '80%' }}
                >
                    <div id="title" className="truncate">
                        {state.track.title}
                    </div>
                    <div id="artist" className="truncate">
                        {state.track.artist}
                    </div>
                </div>
                <div
                    id="player-controls"
                    className="mt-5 d-flex align-items-center justify-content-center"
                >
                    <button
                        id="shuffle"
                        className={'btn btn-dark ' + shuffleStyle}
                        onClick={toggleShuffle}
                    >
                        <Shuffle />
                    </button>
                    <button
                        id="now-playing-prev"
                        onClick={(e) => {
                            var target = e.currentTarget;
                            return buttonAnimate(e)
                                .then(_ => {
                                    target.classList.remove('active');
                                    document.querySelector('#skip-backward').click();
                                });
                        }}
                        className={'btn btn-dark' + disabledNextPrev}
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
                            var target = e.currentTarget;
                            return buttonAnimate(e)
                                .then(_ => {
                                    target.classList.remove('active');
                                    document.querySelector('#skip-forward').click();
                                });
                        }}
                        id="now-playing-next"
                        className={'btn btn-dark' + disabledNextPrev}
                    >
                        <SkipForward />
                    </button>
                    <button
                        id="repeat"
                        className={'btn btn-dark ' + repeatStyle}
                        onClick={toggleRepeat}
                    >
                        <Repeat />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NowPlaying;
