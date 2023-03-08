const postData = async (endpoint = '', data = {}) => {
    const url = new URL(process.env.REACT_APP_API_URL + endpoint);
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
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
        const response = await getData('/sign-in', { email, password });
        if (response.success) return response.data;
        else return [];
    },
    musicSearch: async (searchTerm) => {
        const response = await getData('/music/search', { term: searchTerm });
        if (response.success) return response.data;
        else return [];
    },
    radioStations: async () => {
        const response = await getData('/radio/stations');
        if (response.success) return response.data;
        else return [];
    },
    parseRadio: async (url) => {
        if (url.length > 0) {
            const response = await getData('/radio/parse', { url });
            if (response.success) return response.data;
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
    }
};

export default API;
