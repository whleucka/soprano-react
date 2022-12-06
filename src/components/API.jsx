const postData = async (endpoint = '', data = {}) => {
    const url = new URL(process.env.REACT_APP_API_URL + endpoint);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
    musicSearch: async (searchTerm) => {
        const response = await getData('music/search', { term: searchTerm });
        if (response.success) return response.data;
        else return [];
    }
};

export default API;
