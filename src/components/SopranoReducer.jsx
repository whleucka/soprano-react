export function SopranoReducer(state, action) {
    switch (action.type) {
        case 'setUser':
            return { ...state, user: action.payload };
        case 'setSearchResults':
            return { ...state, searchResults: action.payload };
        case 'setTrack':
            return { ...state, track: action.payload };
        case 'setStatus':
            return { ...state, status: action.payload };
        default:
            return state;
    }
}
