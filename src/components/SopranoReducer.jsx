export const SopranoReducer = (state, action) => {
  switch (action.type) {
    case 'getLiked':
      var music = state.music;
      music.liked = action.payload;
      return { ...state, music };
    case 'setPlaylistTracks':
      var music = state.music;
      var playlist = music.playlist;
      playlist.tracks = action.payload;
      return { ...state, music };
    case 'setTrack':
      var track = action.payload;
      return { ...state, track };
    case 'previousTrack':
      var music = state.music;
      var playlist = music.playlist;
      var index = (playlist.index - 1 + playlist.tracks.length) % playlist.tracks.length;
      playlist.index = index;
      return { ...state, music };
    case 'nextTrack':
      var music = state.music;
      var playlist = music.playlist;
      var index = (playlist.index + 1) % playlist.tracks.length;
      playlist.index = index;
      return { ...state, music };
    default:
      return state;
  }
};
