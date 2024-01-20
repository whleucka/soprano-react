import { useEffect, useContext, useState } from 'react'
import Avatar from 'react-avatar';
import API from './API';
import { SopranoContext } from './Soprano';
import { useNavigate } from 'react-router-dom';
import SearchLinks from './SearchLinks';

const Genres = (props) => {
	const [showMore, setShowMore] = useState(true);
	const { state, dispatch } = useContext(SopranoContext);
	const fetchGenres = (page = 1) => {
		API.getGenres(page).then((res) => {
			dispatch({
				type: 'setGenresResults',
				payload: res
			});
		}).catch((err) => {
			console.log(err);
		});
	}

	const fetchMore = () => {
		fetchGenres(parseInt(genres.page) + 1);
	}

	useEffect(() => {
		if (state.music.genres.page) {
			setShowMore(genres.max_pages > genres.page);
		}
	}, [state.music.genres]);

	const { genres } = props;
	return (
		<div>
			<SearchLinks />
			{ genres.genres.length > 0 &&
				genres.genres.map((track, i) => {
					return <Genre key={i} track={track} />
				})
			}
			{ showMore &&
				<button tabIndex="-1" className="load-more font-weight-bold text-success" onClick={fetchMore}>Load More!</button>
			}
		</div>
	);
}

export default Genres;

const Genre = ({ track }) => {
	const { genre } = track;
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

    const image = <Avatar name={genre} size={40} />

	return (
		<div title={genre} className="track-row pointer d-flex justify-content-center align-items-center w-100">
			<div className="image">
				<div className="mb-2">{image}</div>
			</div>
			<div className="flex-grow-1 truncate px-2" onClick={handleSearchGenre}>
				<div className="truncate">{genre.replaceAll('|', "/")}</div>
			</div>
		</div>
	);
}
