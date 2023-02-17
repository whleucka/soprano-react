const CoverSize = ({ md5 = null, size = null }) => {
    let cover = '/img/no-album.png';
    if (md5 && size) {
        const width = size[0];
        const height = size[1];
        cover =
            process.env.REACT_APP_API_URL + `/cover/${md5}/${width}/${height}`;
    }
    return (
        <img
            className="cover"
            src={cover}
            alt="cover art"
            loading="lazy"
            onError={(e) => (e.currentTarget.src = 'img/no-album.png')}
        />
    );
};

export default CoverSize;
