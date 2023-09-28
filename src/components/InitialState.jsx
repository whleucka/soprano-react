export const InitialState = {
    user: '',
    mode: null,
    track: {},
    status: 'idle',
    music: {
        controls: {
            repeat: false,
            shuffle: true
        },
        search: {
            term: '',
            type: 'all',
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
