import { useContext, useEffect } from 'react';
import { SopranoContext } from './Soprano';
import TrackRow from './TrackRow';

const Radio = () => {
    const { state } = useContext(SopranoContext);

    useEffect(() => {
        if (
            Object.keys(state.track).length > 0 &&
            state.track.src &&
            state.mode === 'radio'
        ) {
            var audio = document.getElementById('audio');
            const Hls = require('hls.js');
            if (Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource(state.track.src);
                hls.attachMedia(audio);
            }
        }
    }, [state.track.src]);

    const stations = [
        {
            md5: 1,
            artist: 'Lethbridge, Canada',
            album: 'Radio',
            title: 'B-93.3',
            cover: 'https://media.socastsrm.com/uploads/station/634/site_header_logo-58794a7ee0257.png',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'https://stream.jpbgdigital.com/CJBZ/HEAAC/48k/playlist.m3u8'
        },
        {
            md5: 2,
            artist: 'Lethbridge, Canada',
            album: 'Radio',
            title: '106.7 ROCK',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/fb/CJRX_106.7ROCK_logo.png',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'https://rogers-hls.leanstream.co/rogers/let1067.stream/playlist.m3u8?environment=web&args=web_01'
        },
        {
            md5: 3,
            artist: 'Lethbridge, Canada',
            album: 'Radio',
            title: 'KiSS 107.7',
            cover: 'https://static.mytuner.mobi/media/tvos_radios/xnh7ecldupxu.png',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'https://rogers.leanstream.co/rogers/let1077.stream/playlist.m3u8'
        },
        {
            md5: 4,
            artist: 'Calgary, Canada',
            album: 'Radio',
            title: 'CBC Radio One',
            cover: 'https://cdn-profiles.tunein.com/s20305/images/logog.png?t=1',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'https://cbcradiolive.akamaized.net/hls/live/2041039/ES_R1MCG/master.m3u8'
        },
        {
            md5: 5,
            artist: 'Edmonton, Canada',
            album: 'Radio',
            title: 'CBC Radio Two',
            cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQaYebQznztE4ezbTBn0_wIdwe5BJkCkjyUB5N4uk1dblU5JPI0__E0ipFEIE2w40NOUM&usqp=CAU',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'https://cbcradiolive.akamaized.net/hls/live/2041058/ES_R2MED/master.m3u8'
        },
        {
            md5: 6,
            artist: 'Victoria, Canada',
            album: 'Radio',
            title: 'JACK 103.1',
            cover: 'https://cdn-profiles.tunein.com/s11996/images/logog.png',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'https://rogers-hls.leanstream.co/rogers/vic1031.stream/playlist.m3u8?environment=web&args=web_01'
        }
    ];

    return (
        <>
            <h2 className="header">Radio</h2>
            {stations.map((station, index) => {
                return <TrackRow mode="radio" key={index} track={station} />;
            })}
        </>
    );
};

export default Radio;
