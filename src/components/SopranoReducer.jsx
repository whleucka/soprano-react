export const SopranoReducer = (state, action) => {
  switch (action.type) {
    case 'getLiked':
      var music = state.music;
      music.liked = action.payload;
      return { ...state, music };
    case 'setPlaylistIndex':
      var music = state.music;
      var playlist = music.playlist;
      playlist.index = action.payload;
      return { ...state, music };
    case 'setPlaylistTracks':
      var music = state.music;
      var playlist = music.playlist;
      playlist.tracks = action.payload;
      return { ...state, music };
    case 'setTrack':
      var track = action.payload;
      return { ...state, track };
    case 'playAllLiked':
      var music = state.music;
      music.playlist.tracks = music.liked;
      return { ...state, music };
    default:
      return state;
  }
};
