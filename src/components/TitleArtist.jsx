const TitleArtist = ({ title, artist }) => {
    return <div className="title-artist d-flex flex-column">
        <div className="title truncate" title={title}>
            {title}
        </div>
        <div className="artist truncate" title={artist}>
            {artist}
        </div>
    </div>;
};

export default TitleArtist;
