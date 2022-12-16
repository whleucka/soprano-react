import { FastAverageColor } from "fast-average-color";

const AlbumCover = ({ cover, playerCover = false }) => {
    const handleOnLoad = (e) => {
        if (playerCover) {
            const fac = new FastAverageColor();
            fac.getColorAsync(cover)
            .then(color => {
                console.log("Setting color", color.hex);
                document.getElementById('player-progressbar').style.background = color.hex;
                document.getElementById('backdrop').style.backgroundColor = color.hex;
            });
        }
    }
    return <img onLoad={handleOnLoad} className="cover" src={cover} alt="cover art" loading="lazy" />;
};

export default AlbumCover;
