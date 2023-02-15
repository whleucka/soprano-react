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
        case 'setPlaylist':
            return { ...state, playlist: action.payload };
        case 'setPlaylistIndex':
            return { ...state, playlistIndex: action.payload };
        case 'setShuffle':
            return { ...state, shuffle: action.payload };
        case 'setRadioStations':
            return { ...state, radio_stations: action.payload };
        default:
            return state;
    }
}
