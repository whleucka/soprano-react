const TitleArtist = ({ title, artist }) => {
    return (
        <div className="title-artist">
            <div className="title" title={title}>
                {title}
            </div>
            <div className="artist" title={artist}>
                {artist}
            </div>
        </div>
    );
};

export default TitleArtist;
