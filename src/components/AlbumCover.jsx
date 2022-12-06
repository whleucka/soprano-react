const AlbumCover = ({ cover }) => {
    const cover_url = cover
        ? process.env.REACT_APP_SERVER_URL + cover
        : '/img/no-album.png';
    return <img className="cover" src={cover_url} alt="cover art" />;
};

export default AlbumCover;
