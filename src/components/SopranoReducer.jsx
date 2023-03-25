export function SopranoReducer(state, action) {
    switch (action.type) {
        case 'setUser':
            return { ...state, user: action.payload };
        case 'setMode':
            return { ...state, mode: action.payload };
        case 'setSearchResults':
            return { ...state, searchResults: action.payload };
        case 'setPodcastResults':
            return { ...state, podcastResults: action.payload };
        case 'setTrack':
            return { ...state, track: action.payload };
        case 'setStatus':
            return { ...state, status: action.payload };
        case 'setPlaylists':
            return { ...state, playlists: action.payload };
        case 'setPlaylist':
            return { ...state, playlist: action.payload };
        case 'mergePlaylist':
            const mergedPlaylist = [...state.playlist, ...action.payload];
            return { ...state, playlist: mergedPlaylist };
        case 'appendPlaylist':
            const appendedPlaylist = [...state.playlist, action.payload];
            return { ...state, playlist: appendedPlaylist };
        case 'setPlaylistIndex':
            return { ...state, playlistIndex: action.payload };
        case 'setRadioStations':
            return { ...state, radioStations: action.payload };
        case 'setTrackTitleArtist':
            const track = { ...state.track, ...action.payload };
            return { ...state, track };
        case 'setUser':
            return { ...state, user: action.payload };
        case 'toggleShuffle':
            return { ...state, shuffle: action.payload };
        case 'toggleRepeat':
            return { ...state, repeat: action.payload };
        case 'updateTrackLike':
            const target =
                action.mode === 'search' ? state.searchResults : state.playlist;
            let updatedLike = target.map((track) => {
                if (track === action.payload) {
                    track.liked = action.liked ? 1 : 0;
                }
                return track;
            });
            return { ...state, target: updatedLike };
        case 'removeFromPlaylist':
            const tracks = state.playlist.filter(track => track.id != action.payload)
            return { ...state, playlist: tracks }
        default:
            return state;
    }
}
