import { useEffect, useContext, useState } from "react";
import { Play, Pause, SkipForward, SkipBack } from "react-feather";
import { SopranoContext } from "./Soprano";

const PlayerControls = () => {
    const { dispatch, state } = useContext(SopranoContext);

    const play = () => {
        dispatch({ type: "setStatus", payload: "playing" });

        const audio = document.getElementById("audio");
        audio.play()
            .then(_ => updateMeta())
            .catch(err => console.log(err));
    }

    const pause = () => {
        dispatch({ type: "setStatus", payload: "paused" });
        const audio = document.getElementById("audio");
        audio.pause();
    }

    const handlePlayPause = (e) => {
        const audio = document.getElementById("audio");
        if (audio) {
            if (audio.paused) {
                play();
            } else {
                pause();
            }
        }
    }

    const previous = () => {
        if (state.playlist.length === 0) {
            dispatch({ type: "setStatus", payload: "idle" });
            return;
        }
        console.log("previous wip");
    }

    const next = () => {
        if (state.playlist.length === 0) {
            dispatch({ type: "setStatus", payload: "idle" });
            return;
        }
        console.log("next wip");
    }

    const updateMeta = () => {
        const audio = document.getElementById("audio");
        const track = state.track;
        const cover = process.env.REACT_APP_SERVER_URL + track.cover;
        console.log("Updating metadata...");
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist,
            album: track.album,
            artwork: [
                { src: cover, sizes: '96x96', type: 'image/png' },
                { src: cover, sizes: '128x128', type: 'image/png' },
                { src: cover, sizes: '192x192', type: 'image/png' },
                { src: cover, sizes: '256x256', type: 'image/png' },
                { src: cover, sizes: '384x384', type: 'image/png' },
                { src: cover, sizes: '512x512', type: 'image/png' },
            ]
        });
        navigator.mediaSession.setActionHandler('previoustrack', previous);
        navigator.mediaSession.setActionHandler('nexttrack', next);
        navigator.mediaSession.setActionHandler('play', play);
        navigator.mediaSession.setActionHandler('pause', pause);
    }

    const updatePositionState = () => {
        const audio = document.getElementById("audio");
        if ('setPositionState' in navigator.mediaSession) {
            console.log("Updating position...");
            navigator.mediaSession.setPositionState({
                duration: audio.duration,
                playbackRate: audio.playbackRate,
                position: audio.currentTime
            });
        }
    }

    useEffect(() => {
        if (state.track) {
            dispatch({ type: "setStatus", payload: "playing" });
            updateMeta();
        }
    }, [state.track]);

    useEffect(() => {
        const audio = document.getElementById("audio");
        if (audio) {
            audio.addEventListener('ended', next);
            audio.addEventListener('loadedmetadata', function() {
                console.log("loaded metadata");
                updatePositionState();
            });
        }
    }, []);

    return (
        <div id="player-controls" className="d-flex align-items-center justify-content-center h-100 w-100">
            <button className="btn btn-dark" onClick={previous}><SkipBack /></button>
            <button className="btn btn-dark" onClick={handlePlayPause}>
                {(state.status === "paused" || state.status === "idle") &&
                    <Play />
                }
                {state.status === "playing" &&
                    <Pause />
                }
            </button>
            <button className="btn btn-dark" onClick={next}><SkipForward /></button>
        </div>
    );
};

export default PlayerControls;
