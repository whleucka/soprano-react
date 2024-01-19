export const InitialState = {
    user: '',
    mode: null,
    track: {
        cover: "/img/no-album.png"
    },
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
        liked: [],
        artists: {
            artists: [],
            page: 0,
            max_pages: 0
        },
        albums: {
            albums: [],
            page: 0,
            max_pages: 0
        },
        genres: {
            genres: [],
            page: 0,
            max_pages: 0
        },
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
