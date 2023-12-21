import { useEffect, useContext } from 'react';
import Avatar from 'react-avatar';
import API from './API';
import { SopranoContext } from './Soprano';
import { useNavigate } from 'react-router-dom';

const Artists = (props) => {
    const { dispatch } = useContext(SopranoContext);
	const fetchArtists = () => {
		API.getArtists().then((res) => {
			dispatch({
				type: 'setArtistsResults',
				payload: res
			});
		}).catch((err) => {
			console.log(err);
		});
	}

	useEffect(() => {
		if (!props.artists.length) {
			fetchArtists();
		}
	}, []);

	const { artists } = props;
	return artists.map((artist, i) => {
		return <Artist key={i} artist={artist.artist} />
	});
}

export default Artists;

const Artist = ({ artist }) => {
    const { state, dispatch } = useContext(SopranoContext);
	const navigate = useNavigate();

	const handleSearchArtist = () => {
		dispatch({ type: 'setMusicSearchType', payload: 'artist' });
		dispatch({ type: 'setMusicSearchTerm', payload: artist });
		invokeSearch();
	}

	const invokeSearch = () => {
		if (window.location.pathname !== '/search') {
			navigate('/search');
		}
		dispatch({
			type: 'setMusicSearchResults',
			payload: []
		});
		API.musicSearch(artist, 'artist', state.user)
			.then((tracks) => {
				if (tracks.length > 0) {
					dispatch({
						type: 'setMusicSearchResults',
						payload: tracks
					});
				} else {
					dispatch({
						type: 'setMusicSearchResults',
						payload: []
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (<Avatar onClick={handleSearchArtist} className="m-2 pointer" name={artist} title={artist} size="40" />)
}
