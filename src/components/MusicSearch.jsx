import { useState } from "react";
import { Search as SearchIcon } from 'react-feather';
import API from "./API";

const MusicSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        const term = e.currentTarget.value.trim();
        setSearchTerm(term);
    };

    const handleSubmit = (e) => {
        // Make some request to api
        if (searchTerm) {
            console.log(`Now searching ${searchTerm}`);
            API.getData("music/search", { term: searchTerm })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
        }
    };

    return <div id="music-search">
        <input placeholder="I want to listen to..." type="search" onChange={handleChange} value={searchTerm} className="form-control form-control-sm" />
        <button type="submit" onClick={handleSubmit} className="btn btn-primary"><SearchIcon height="14" /></button>
    </div>;
};

export default MusicSearch;
