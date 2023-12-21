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
        artists: [],
        albums: [],
        genres: [],
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
