export const InitialState = {
    user: '514f7883-0225-45bf-9bcf-1a52092cdaf1',
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
