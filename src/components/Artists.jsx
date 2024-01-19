import { useEffect, useContext, useState } from 'react';
import API from './API';
import { SopranoContext } from './Soprano';
import { useNavigate } from 'react-router-dom';
import SearchLinks from './SearchLinks';
import Avatar from 'react-avatar';

const Artists = (props) => {
	const [showMore, setShowMore] = useState(true);
	const { state, dispatch } = useContext(SopranoContext);
	const fetchArtists = (page = 1) => {
		API.getArtists(page).then((res) => {
			dispatch({
				type: 'setArtistsResults',
				payload: res
			});
		}).catch((err) => {
			console.log(err);
		});
	}

	const fetchMore = () => {
		fetchArtists(parseInt(artists.page) + 1);
	}

	useEffect(() => {
		if (!state.music.artists.page) {
			console.log("loading artists..");
			fetchArtists(1);
		}
	}, [state.music.artists]);

	const { artists } = props;
	return (
		<div>
			<SearchLinks />
			{ artists.artists.length > 0 &&
				artists.artists.map((track, i) => {
					return <Artist key={i} track={track} />
				})
			}
			{ showMore &&
				<button tabIndex="-1" className="load-more font-weight-bold text-success" onClick={fetchMore}>Load More!</button>
			}
		</div>
	)
}

export default Artists;

const Artist = ({ track }) => {
	const { artist } = track;
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

    const image = <Avatar name={artist} size={40} />

	return (
		<div title={artist} className="track-row pointer d-flex justify-content-center align-items-center w-100">
			<div className="image">
				<div className="mb-2">{image}</div>
			</div>
			<div className="flex-grow-1 truncate px-2" onClick={handleSearchArtist}>
				<div className="truncate">{artist}</div>
			</div>
		</div>
	);
}
