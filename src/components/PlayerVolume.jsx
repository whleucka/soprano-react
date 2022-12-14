import { useState, useEffect, useRef } from 'react';
import { Volume } from 'react-feather';

const PlayerVolume = ({ audioRef }) => {
    const [volume, setVolume] = useState(100);
    const volumeProgressRef = useRef(null);

    const handleClick = (e) => {
        const self = e.currentTarget;
        const width = volumeProgressRef.current.offsetWidth;
        const x = e.pageX - self.offsetLeft;
        const pct = width > 0 ? (x / width) * 100 : 0;
        setVolume(Math.round(pct));
    };

    useEffect(() => {
        const level = volume / 100;
        audioRef.current.volume = level.toFixed(1);
    }, [volume, audioRef]);

    return (
        <div
            id="player-volume"
            className="d-flex align-items-center justify-content-end h-100 w-100 ps-5 text-secondary"
        >
            <Volume />
            <div
                id="volume-progress"
                ref={volumeProgressRef}
                onClick={handleClick}
                className="progress w-100"
            >
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: volume + '%' }}
                ></div>
            </div>
        </div>
    );
};

export default PlayerVolume;
