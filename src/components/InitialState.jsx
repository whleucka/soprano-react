export const InitialState = {
    user: '',
    mode: null,
    track: null,
    status: 'idle',
    music: {
        search: {
            term: '',
            type: 'title',
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
