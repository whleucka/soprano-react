import { useContext, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack } from 'react-feather';
import { SopranoContext } from "./Soprano";
import { Link } from 'react-router-dom';

const NowPlaying = () => {
    const { state } = useContext(SopranoContext);
    const track = state.track;

    const activePlay = state.status === 'playing' ? ' active' : '';
    const disabledPlay = Object.keys(track).length === 0 ? ' disabled' : '';


    useEffect(() => {
        document.getElementById("player").style.display = "none";
        document.querySelector("div#progress-cont").style.position = "fixed";
        return () => {
            document.getElementById("player").style.display = "block";
            document.querySelector("div#progress-cont").style.position = "relative";
        };
    }, []);

    return (
        <section id="now-playing" className="h-100 w-100">
            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
                <Link to="/playlist"><img title={state.track.album} src={state.track.cover} loading="lazy" className="rounded" /></Link>
                <div className="text-center" style={{width: "80%"}}>
                    <h3 className="truncate">{state.track.title}</h3>
                    <h5 className="truncate text-secondary">{state.track.artist}</h5>
                </div>
                <div
                    id="player-controls"
                    className="mt-2 d-flex align-items-center justify-content-center"
                >
                    <button
                        onClick={(e) => {
                            document.querySelector("#skip-backward").click();
                        }}
                        className='btn btn-dark'
                    >
                        <SkipBack size="3rem" />
                    </button>
                    <button
                        onClick={(e) => {
                            document.querySelector("#play-pause-btn").click();
                        }}
                        id="now-playing-play"
                        className={'btn btn-dark' + disabledPlay + activePlay}
                    >
                        {state.status !== 'playing' && <Play size="3.5rem" />}
                        {state.status === 'playing' && <Pause size="3.5rem" />}
                    </button>
                    <button
                        onClick={(e) => {
                            document.querySelector("#skip-forward").click();
                        }}
                        className='btn btn-dark'
                    >
                        <SkipForward size="3rem" />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default NowPlaying;
