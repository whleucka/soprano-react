const postData = async (endpoint = '', data = {}) => {
    const url = new URL(process.env.REACT_APP_API_URL + endpoint);
    var formdata = new FormData();
    if (data) {
        for (const property in data) {
            formdata.append(property, data[property]);
        }
    }
    const response = await fetch(url, {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    });
    return response.json();
};

const getData = async (endpoint = '', data = {}) => {
    const url = new URL(process.env.REACT_APP_API_URL + endpoint);
    url.search = new URLSearchParams(data);
    const response = await fetch(url, {
        method: 'GET'
    });
    return response.json();
};

const API = {
    signIn: async (email, password) => {
        const response = await postData('/sign-in', { email, password });
        if (response.success) return response.data;
        else {
            console.log(response);
        }
        return [];
    },
    loadUser: async (uuid) => {
        const response = await postData('/customer/load', { uuid });
        if (response.success) return response.data;
        else {
            console.log(response);
        }
        return [];
    },
    musicSearch: async (term, type, uuid = null) => {
        const response = await postData('/music/search', { term, type, uuid });
        if (response.success) return response.data;
        else {
            console.log(response);
        }
        return [];
    },
    radioStations: async () => {
        const response = await getData('/radio/stations');
        if (response.success) return response.data;
        else {
            console.log(response);
        }
        return [];
    },
    parseRadio: async (url) => {
        if (url.length > 0) {
            const response = await getData('/radio/parse', { url });
            if (response.success) return response.data;
            else {
                console.log(response);
            }
        }
        return [];
    },
    podcastSearch: async (searchTerm, sortByDate, offset) => {
        const url = new URL('https://listen-api.listennotes.com/api/v2/search');
        const data = {
            q: searchTerm,
            type: 'episode',
            language: 'English',
            region: 'ca,us,gb',
            sort_by_date: sortByDate,
            offset
        };
        url.search = new URLSearchParams(data);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-ListenAPI-Key': process.env.REACT_APP_LISTEN_NOTES_API_KEY
            }
        });
        return response.json();
    },
    likeTrack: async (md5, uuid) => {
        const response = await postData(`/like/${md5}`, { uuid });
        if (response.success) return response.data;
        else {
            console.log(response);
        }
        return [];
    },
    getLikeCount: async (uuid) => {
        const response = await postData(`/liked/count`, { uuid });
        if (response.success) return response.data;
        else {
            console.log(response);
        }
        return [];
    },
    getLikedPlaylist: async (uuid) => {
        const response = await postData(`/liked/playlist`, { uuid });
        if (response.success) return response.data;
        else {
            console.log(response);
        }
        return [];
    },
    getAlbums: async () => {
        const response = await getData('/music/albums');
        if (response.success) return response.data;
        else {
            console.log(response);
        }
        return [];
    },
    getArtists: async () => {
        const response = await getData('/music/artists');
        if (response.success) return response.data;
        else {
            console.log(response);
        }
        return [];
    },
    getGenres: async () => {
        const response = await getData('/music/genres');
        if (response.success) return response.data;
        else {
            console.log(response);
        }
        return [];
    },
};

export default API;
