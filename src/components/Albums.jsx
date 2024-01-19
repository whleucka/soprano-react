import { useEffect, useContext, useState } from 'react';
import API from './API';
import { SopranoContext } from './Soprano';
import { useNavigate } from 'react-router-dom';
import CoverSize from './CoverSize';
import SearchLinks from './SearchLinks';

const Albums = (props) => {
	const [showMore, setShowMore] = useState(true);
	const { state, dispatch } = useContext(SopranoContext);
	const fetchAlbums = (page = 1) => {
		API.getAlbums(page).then((res) => {
			dispatch({
				type: 'setAlbumResults',
				payload: res
			});
		}).catch((err) => {
			console.log(err);
		});
	}

	const fetchMore = () => {
		fetchAlbums(parseInt(albums.page) + 1);
	}

	useEffect(() => {
		if (!state.music.albums.page) {
			console.log("loading albums..");
			fetchAlbums(1);
		} else {
			setShowMore(albums.max_pages > albums.page);
		}
	}, [state.music.albums]);

	const { albums } = props;
	return (
		<div>
			<SearchLinks />
			{ albums.albums.length > 0 &&
				albums.albums.map((track, i) => {
					return <Album key={i} track={track} />
				})
			}
			{ showMore &&
				<button tabIndex="-1" className="load-more font-weight-bold text-success" onClick={fetchMore}>Load More!</button>
			}
		</div>
	)
}

export default Albums;

const Album = ({ track }) => {
	const { md5, album } = track;
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
    const image = <CoverSize md5={md5} size={[70, 70]} />

	return (
		<div title={album} className="track-row pointer d-flex justify-content-center align-items-center w-100">
			<div className="image">
				<div className="mb-2">{image}</div>
			</div>
			<div className="flex-grow-1 truncate px-2" onClick={handleSearchAlbum}>
				<div className="truncate">{album}</div>
			</div>
		</div>
	);
}
