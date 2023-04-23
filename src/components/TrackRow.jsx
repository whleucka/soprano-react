const TrackRow = (props) => {
  const { image, title, playtime } = props;
  return <div className="track-row d-flex align-items-center">
    <div className="image">
      {image}
    </div>
    <div onClick={props.handleTitleClick} className="title flex-grow-1 truncate">
      {title}
    </div>
    <div className="playtime">
      {playtime}
    </div>
  </div>
};

export default TrackRow;
