import { useContext, useEffect } from "react";
import { SopranoContext } from "./Soprano";
import TrackRow from "./TrackRow";

const Radio = () => {
    const {state} = useContext(SopranoContext);
    useEffect(() => {
        if (Object.keys(state.track).length > 0 && state.track.src) {
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
            backdrop: 'https://media.socastsrm.com/uploads/station/634/site_header_logo-58794a7ee0257.png',
            playtime_seconds: 0,
            playtime_string: null,
            src:
                'https://stream.jpbgdigital.com/CJBZ/HEAAC/48k/playlist.m3u8'
        },
        {
            md5: 2,
            artist: 'Lethbridge, Canada',
            album: 'Radio',
            title: '106.7 ROCK',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/fb/CJRX_106.7ROCK_logo.png',
            backdrop: 'https://upload.wikimedia.org/wikipedia/en/f/fb/CJRX_106.7ROCK_logo.png',
            playtime_seconds: 0,
            playtime_string: null,
            src:
                'https://rogers-hls.leanstream.co/rogers/let1067.stream/playlist.m3u8?environment=web&args=web_01'
        },
        {
            md5: 3,
            artist: 'Lethbridge, Canada',
            album: 'Radio',
            title: 'KiSS 107.7',
            cover: 'https://static.mytuner.mobi/media/tvos_radios/xnh7ecldupxu.png',
            backdrop: 'https://static.mytuner.mobi/media/tvos_radios/xnh7ecldupxu.png',
            playtime_seconds: 0,
            playtime_string: null,
            src:
                'https://rogers.leanstream.co/rogers/let1077.stream/playlist.m3u8'
        },
        {
            md5: 4,
            artist: 'Calgary, Canada',
            album: 'Radio',
            title: 'CBC Radio One',
            cover: 'https://ca.radio.net/images/broadcasts/8f/25/34613/1/c300.png',
            backdrop: 'https://ca.radio.net/images/broadcasts/8f/25/34613/1/c300.png',
            playtime_seconds: 0,
            playtime_string: null,
            src:
                'https://cbcradiolive.akamaized.net/hls/live/2041039/ES_R1MCG/master.m3u8'
        },
        {
            md5: 5,
            artist: 'Edmonton, Canada',
            album: 'Radio',
            title: 'CBC Radio Two',
            cover: 'https://www.radio.net/images/broadcasts/80/11/4615/1/c300.png',
            backdrop: 'https://www.radio.net/images/broadcasts/80/11/4615/1/c300.png',
            playtime_seconds: 0,
            playtime_string: null,
            src:
                'https://cbcradiolive.akamaized.net/hls/live/2041058/ES_R2MED/master.m3u8'
        },
        {
            md5: 6,
            artist: 'Victoria, Canada',
            album: 'Radio',
            title: 'JACK 103.1',
            cover: 'https://cdn-profiles.tunein.com/s11996/images/logog.png',
            backdrop: 'https://cdn-profiles.tunein.com/s11996/images/logog.png',
            playtime_seconds: 0,
            playtime_string: null,
            src:
                'https://rogers-hls.leanstream.co/rogers/vic1031.stream/playlist.m3u8?environment=web&args=web_01'
        }
    ];

    return <>
            <h2 className="header">Radio</h2>
            {stations.map((station, index) => { return (<TrackRow key={index} track={station} />);
            })}
        </>
}

export default Radio;
