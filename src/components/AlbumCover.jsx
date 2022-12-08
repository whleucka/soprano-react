const AlbumCover = ({ cover }) => {
    const coverUrl = cover
        ? process.env.REACT_APP_SERVER_URL + cover
        : '/img/no-album.png';
    return <img className="cover" src={coverUrl} alt="cover art" />;
};

export default AlbumCover;
