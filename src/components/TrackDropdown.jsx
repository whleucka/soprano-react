import { useState, useContext } from "react";
import { Disc as DiscIcon, User as UserIcon, Music as MusicIcon } from 'react-feather';
import { SopranoContext } from './Soprano';
import API from "./API";
import { useNavigate } from 'react-router-dom';

const TrackDropdown = ({ image, track }) => {
	const { state, dispatch } = useContext(SopranoContext);
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const toggleOpen = () => setIsOpen((isOpen) => !isOpen);

	const handleSearchAlbum = () => {
		dispatch({ type: 'setMusicSearchType', payload: 'album' });
		dispatch({ type: 'setMusicSearchTerm', payload: track.album });
		invokeSearch(track.album, 'album');
	}

	const handleSearchArtist = () => {
		dispatch({ type: 'setMusicSearchType', payload: 'artist' });
		dispatch({ type: 'setMusicSearchTerm', payload: track.artist });
		invokeSearch(track.artist, 'artist');
	}

	const invokeSearch = (term, type) => {
		if (window.location.pathname !== '/search') {
			navigate('/search');
		}
		dispatch({
			type: 'setMusicSearchResults',
			payload: []
		});
		API.musicSearch(term, type, state.user)
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

	const menuClass = `dropdown-menu dropdown-menu-start dropdown-menu-dark ${isOpen ? ' show' : ''}`;

	return (<div className="dropdown" onClick={toggleOpen}>
		<button className="btn btn-primary m-0 p-0 dropdown-toggle d-flex align-items-center" data-bs-auto-close="*" type="button">
			<span className="playtime">{image}</span>
		</button>
		<ul className={menuClass}>
			<li onClick={handleSearchAlbum} className="dropdown-item"><DiscIcon className="me-2" /> {track.album}</li>
			<li onClick={handleSearchArtist} className="dropdown-item"><UserIcon className="me-2" /> {track.artist}</li>
		</ul>
	</div>);
}

export default TrackDropdown;
