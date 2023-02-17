const AlbumCover = ({ cover }) => {
    return (
        <>
            <img className="cover" src={cover} alt="cover art" loading="lazy" onError={ (e) => e.currentTarget.src = 'img/no-album.png' } />
        </>
    );
};

export default AlbumCover;
