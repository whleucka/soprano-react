import { useState, useEffect, useRef } from 'react';
import { Volume } from 'react-feather';

const PlayerVolume = ({ audioRef }) => {
    const [volume, setVolume] = useState(100);
    const volumeProgressRef = useRef(null);
    const progressBar = useRef(null);

    const handleClick = (e) => {
        const self = e.currentTarget;
        const width = volumeProgressRef.current.offsetWidth;
        let x = e.pageX - self.offsetLeft;
        let pct = width > 0 ? (x / width) * 100 : 0;
        pct = Math.min(100, pct);
        pct = Math.max(0, pct);
        setVolume(pct);
    };

    useEffect(() => {
        var level = Math.max(0, volume / 100);
        level = Math.min(1, level);
        audioRef.current.volume = level.toFixed(1);
    }, [volume, audioRef]);

    return (
        <div
            id="player-volume"
            className="d-flex align-items-center justify-content-end h-100 w-100 ps-5 text-secondary"
        >
            <Volume />
            <div
                onClick={handleClick}
                id="volume-progress"
                ref={volumeProgressRef}
                className="progress w-100"
            >
                <div
                    className="progress-bar gradient-rasta"
                    role="progressbar"
                    ref={progressBar}
                    style={{ width: volume + '%' }}
                ></div>
            </div>
        </div>
    );
};

export default PlayerVolume;
