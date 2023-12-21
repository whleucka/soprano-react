import { useEffect, useContext } from 'react';
import Avatar from 'react-avatar';
import API from './API';
import { SopranoContext } from './Soprano';
import { useNavigate } from 'react-router-dom';

const Genres = (props) => {
    const { dispatch } = useContext(SopranoContext);
	const fetchGenres = () => {
		API.getGenres().then((res) => {
			dispatch({
				type: 'setGenresResults',
				payload: res
			});
		}).catch((err) => {
			console.log(err);
		});
	}

	useEffect(() => {
		if (!props.genres.length) {
			fetchGenres();
		}
	}, []);

	const { genres } = props;
	return genres.map((genre, i) => {
		return <Genre key={i} genre={genre.genre} />
	});
}

export default Genres;

const Genre = ({ genre }) => {
    const { state, dispatch } = useContext(SopranoContext);
	const navigate = useNavigate();

	const handleSearchGenre = () => {
		dispatch({ type: 'setMusicSearchType', payload: 'genre' });
		dispatch({ type: 'setMusicSearchTerm', payload: genre });
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
		API.musicSearch(genre, 'genre', state.user)
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

	return (<Avatar onClick={handleSearchGenre} className="m-2 pointer" name={genre} title={genre} size="40" />)
}
