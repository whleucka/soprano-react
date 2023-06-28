export function SopranoReducer(state, action) {
    switch (action.type) {
        case 'setUser':
            return { ...state, user: action.payload };
        case 'setMode':
            return { ...state, mode: action.payload };
        case 'setMusicSearchResults':
            var music = state.music;
            var search = music.search;
            search.results = action.payload;
            return { ...state, music };
        case 'setMusicSearchTerm':
            var music = state.music;
            var search = music.search;
            search.term = action.payload;
            return { ...state, music };
        case 'setMusicSearchType':
            var music = state.music;
            var search = music.search;
            search.type = action.payload;
            return { ...state, music };
        case 'setPlaylist':
            var music = state.music;
            var playlist = music.playlist;
            playlist.tracks = action.payload;
            return { ...state, playlist };
        case 'setPlaylistIndex':
            var music = state.music;
            var playlist = music.playlist;
            playlist.index = action.payload;
            return { ...state, playlist };
         case 'setLiked':
            var music = state.music;
            music.liked = action.payload;
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
        case 'setRadioStations':
            var radio = state.radio;
            radio.stations = action.payload
            return { ...state, radio };
        case 'setPodcastSearchResults':
            var podcasts = state.podcasts;
            var search = podcasts.search;
            search.results = action.payload;
            return { ...state, podcasts };
        case 'setPodcastSearchTerm':
            var podcasts = state.podcasts;
            var search = podcasts.search;
            search.term = action.payload;
            return { ...state, podcasts };
        case 'setRepeat':
            var music = state.music;
            var controls = music.controls;
            controls.repeat = action.payload;
            return { ...state, music }
        case 'setShuffle':
            var music = state.music;
            var controls = music.controls;
            controls.shuffle = action.payload;
            return { ...state, music }



        // case 'setPodcastResults':
        //     return { ...state, podcastResults: action.payload };
        // case 'setTrack':
        //     return { ...state, track: action.payload };
        // case 'setStatus':
        //     return { ...state, status: action.payload };
        // case 'setPlaylists':
        //     return { ...state, playlists: action.payload };
        // case 'mergePlaylist':
        //     const mergedPlaylist = [...state.playlist, ...action.payload];
        //     return { ...state, playlist: mergedPlaylist };
        // case 'appendToPlaylist':
        //     const appendedPlaylist = [...state.playlist, action.payload];
        //     return { ...state, playlist: appendedPlaylist };
        // case 'setTrackTitleArtist':
        //     const track = { ...state.track, ...action.payload };
        //     return { ...state, track };
        // case 'toggleShuffle':
        //     return { ...state, shuffle: action.payload };
        // case 'toggleRepeat':
        //     return { ...state, repeat: action.payload };
        // case 'removeFromPlaylist':
        //     const remove_tracks = state.playlist.filter(
        //         (track) => track.id !== action.payload['id']
        //     );
        //     return { ...state, playlist: remove_tracks };
        // case 'addToPlaylist':
        //     const add_tracks = [...state.playlist, action.payload];
        //     return { ...state, playlist: add_tracks };
        default:
            return state;
    }
}
