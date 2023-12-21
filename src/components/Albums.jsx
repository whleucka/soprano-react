import { useEffect, useContext } from 'react';
import Avatar from 'react-avatar';
import API from './API';
import { SopranoContext } from './Soprano';
import { useNavigate } from 'react-router-dom';

const Albums = (props) => {
    const { dispatch } = useContext(SopranoContext);
	const fetchAlbums = () => {
		API.getAlbums().then((res) => {
			dispatch({
				type: 'setAlbumResults',
				payload: res
			});
		}).catch((err) => {
			console.log(err);
		});
	}

	useEffect(() => {
		if (!props.albums.length) {
			fetchAlbums();
		}
	}, []);

	const { albums } = props;
	return albums.map((album, i) => {
		return <Album key={i} album={album.album} />
	});
}

export default Albums;

const Album = ({ album }) => {
    const { state, dispatch } = useContext(SopranoContext);
	const navigate = useNavigate();

	const handleSearchAlbum = () => {
		dispatch({ type: 'setMusicSearchType', payload: 'album' });
		dispatch({ type: 'setMusicSearchTerm', payload: album });
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
		API.musicSearch(album, 'album', state.user)
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

	return (<Avatar onClick={handleSearchAlbum} className="m-2 pointer" name={album} title={album} size="40" />)
}
