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
            radio.stations = action.payload;
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
            return { ...state, music };
        case 'setShuffle':
            var music = state.music;
            var controls = music.controls;
            controls.shuffle = action.payload;
            return { ...state, music };
        case 'removeFromPlaylist':
            var music = state.music;
            var playlist = music.playlist;
            var tracks = playlist.tracks.filter(
                (track) => track.id !== action.payload['id']
            );
            playlist.tracks = tracks;
            return { ...state, music };
        case 'addToPlaylist':
            var music = state.music;
            var playlist = music.playlist;
            var tracks = playlist.tracks;
            if (!playlist.tracks.includes(action.payload)) {
                playlist.tracks = [...tracks, action.payload];
            }
            return { ...state, music };
        case 'setAlbumResults':
            var music = state.music;
            var albums = music.albums;
            albums.albums = [...albums.albums, ...action.payload['albums']];
            albums.page = action.payload['page'];
            albums.max_pages = action.payload['max_pages'];
            return { ...state, music };
        case 'setArtistsResults':
            var music = state.music;
            var artists = music.artists;
            artists.artists = [...artists.artists, ...action.payload['artists']];
            artists.page = action.payload['page'];
            artists.max_pages = action.payload['max_pages'];
            return { ...state, music };
        case 'setGenresResults':
            var music = state.music;
            var genres = music.genres;
            genres.genres = [...genres.genres, ...action.payload['genres']];
            genres.page = action.payload['page'];
            genres.max_pages = action.payload['max_pages'];
            return { ...state, music };
        default:
            return state;
    }
}
