const AlbumCover = ({ cover }) => {
    const coverUrl = cover && cover.substring(0, 4) !== 'http'
        ? process.env.REACT_APP_SERVER_URL + cover
        : cover;
    return <img className="cover" src={coverUrl} alt="cover art" loading="lazy" />;
};

export default AlbumCover;
