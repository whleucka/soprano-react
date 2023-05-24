export const InitialState = {
    user: '',
    track: null,
    status: 'idle',
    music: {
        search: {
            term: '',
            results: []
        },
        playlist: {
            tracks: [],
            index: 0
        },
        playlists: [],
        liked: []
    },
    radio: {
        stations: []
    },
    podcasts: {
        search: {
            term: '',
            results: []
        }
    }
};
