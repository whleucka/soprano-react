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
    searchMusic: async (term) => {
        const response = await getData('/tracks/search', { term });
        return response;
    }
};

export default API;
