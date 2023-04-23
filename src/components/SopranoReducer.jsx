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
    case 'setPlayer':
      var player = state.player;
      player.src = action.payload.src;
      player.cover = action.payload.cover;
      return { ...state, player };
    default:
      return state;
  }
};
