import { useEffect, useCallback } from 'react';

const useMediaSession = (props) => {
    const {
        title = '',
        artist = '',
        album = '',
        artwork = [],

        onSeekBackward,
        onSeekForward,
        onPlay,
        onPause,
        onPreviousTrack,
        onNextTrack,
        onSeekTo,
        onStop,
        audioRef
    } = props;

    const { mediaSession } = navigator;

    const updatePositionState = useCallback(() => {
        if (Math.floor(audioRef.current.duration) > 0 && audioRef.current.currentTime < Math.floor(audioRef.current.duration) && 'setPositionState' in mediaSession) {
            mediaSession.setPositionState({
                duration: Math.floor(audioRef.current.duration),
                playbackRate: audioRef.current.playbackRate,
                position: audioRef.current.currentTime
            });
        }
    }, [audioRef, mediaSession]);

    useEffect(() => {
        if (title.trim().length > 0 && artist.trim().length > 0) {
            mediaSession.metadata = new MediaMetadata({
                title,
                artist,
                album,
                artwork
            });
        }
        return () => {
            mediaSession.metadata = null;
        };
    }, [title, artist, album, mediaSession]);

    useEffect(() => {
        mediaSession.playbackState = 'playing';
        mediaSession.setActionHandler('play', onPlay);
        updatePositionState();
        return () => {
            mediaSession.setActionHandler('play', null);
        };
    }, [onPlay, mediaSession]);
    useEffect(() => {
        mediaSession.playbackState = 'paused';
        mediaSession.setActionHandler('pause', onPause);
        updatePositionState();
        return () => {
            mediaSession.setActionHandler('pause', null);
        };
    }, [onPause, mediaSession]);
    useEffect(() => {
        mediaSession.setActionHandler('seekbackward', onSeekBackward);
        updatePositionState();
        return () => {
            mediaSession.setActionHandler('seekbackward', null);
        };
    }, [onSeekBackward, mediaSession]);
    useEffect(() => {
        mediaSession.setActionHandler('seekforward', onSeekForward);
        updatePositionState();
        return () => {
            mediaSession.setActionHandler('seekforward', null);
        };
    }, [onSeekForward, mediaSession]);
    useEffect(() => {
        mediaSession.setActionHandler('previoustrack', onPreviousTrack);
        return () => {
            mediaSession.setActionHandler('previoustrack', null);
        };
    }, [onPreviousTrack, mediaSession]);
    useEffect(() => {
        mediaSession.setActionHandler('nexttrack', onNextTrack);
        return () => {
            mediaSession.setActionHandler('nexttrack', null);
        };
    }, [onNextTrack, mediaSession]);
    useEffect(() => {
        mediaSession.setActionHandler('seekto', onSeekTo);
        updatePositionState();
        return () => {
            mediaSession.setActionHandler('seekto', null);
        };
    }, [onSeekTo, mediaSession]);
    useEffect(() => {
        mediaSession.setActionHandler('stop', onStop);
        return () => {
            mediaSession.setActionHandler('stop', null);
        };
    }, [onStop, mediaSession]);
};

export default useMediaSession;
