export const SopranoReducer = (state, action) => {
    switch (action.type) {
        case 'setLiked':
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
        case 'setStatus':
            var status = action.payload;
            return { ...state, status };
        case 'setPlaylistLiked':
            var music = state.music;
            music.playlist.tracks = music.liked;
            return { ...state, music };
        case 'setMusicSearchTerm':
            var music = state.music;
            var search = music.search;
            search.term = action.payload;
            return { ...state, music };
        case 'setMusicSearchResults':
            var music = state.music;
            var search = music.search;
            search.results = action.payload;
            return { ...state, music };
        default:
            return state;
    }
};
