import { useContext, useEffect } from "react";
import { SopranoContext } from "./Soprano";
import TrackRow from "./TrackRow";

const Radio = () => {
    const {state} = useContext(SopranoContext);
    useEffect(() => {
        if (Object.keys(state.track).length > 0) {
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
            src:
                'https://stream.jpbgdigital.com/CJBZ/HEAAC/48k/playlist.m3u8'
        },
        {
            md5: 2,
            artist: 'Lethbridge, Canada',
            album: 'Radio',
            title: '106.7 ROCK',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/fb/CJRX_106.7ROCK_logo.png',
            playtime_seconds: 0,
            playtime_string: null,
            src:
                'https://rogers-hls.leanstream.co/rogers/let1067.stream/playlist.m3u8?environment=web&args=web_01'
        },
        {
            md5: 3,
            artist: 'Lethbridge, Canada',
            album: 'Radio',
            title: '94.1 CJOC-FM',
            cover: 'https://www.southernalberta.com/business/datapics/CJOCLogo.jpg',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'https://vistaradio.streamb.live/SB00093'
        },
        {
            md5: 4,
            artist: 'Lethbridge, Canada',
            album: 'Radio',
            title: 'KiSS 107.7',
            cover: 'https://static.mytuner.mobi/media/tvos_radios/xnh7ecldupxu.png',
            playtime_seconds: 0,
            playtime_string: null,
            src:
                'https://rogers.leanstream.co/rogers/let1077.stream/playlist.m3u8'
        },
        {
            md5: 5,
            artist: 'Lethbridge, Canada',
            album: 'Radio',
            title: 'CKXU 88.3',
            cover: 'https://s3-media0.fl.yelpcdn.com/bphoto/Ps2OUT-QY4OZiPGr5DGRHA/ls.jpg',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'http://142.66.2.30:8000/stream/2/'
        },
        {
            md5: 6,
            artist: 'Calgary, Canada',
            album: 'Radio',
            title: 'AMP 90.3',
            cover: 'https://www.radio.net/images/broadcasts/03/19/36796/c300.png',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'http://newcap.leanstream.co/CKMPFM-MP3?args_01'
        },
        {
            md5: 7,
            artist: 'Calgary, Canada',
            album: 'Radio',
            title: 'CJAY 92.1',
            cover: 'https://is1-ssl.mzstatic.com/image/thumb/Purple69/v4/dc/50/0c/dc500cc5-0a3d-5953-b096-54d2d1ae05f8/source/512x512bb.jpg',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'http://24963.live.streamtheworld.com/CJAYFM.mp3'
        },
        {
            md5: 8,
            artist: 'Calgary, Canada',
            album: 'Radio',
            title: 'X92.9 ',
            cover: 'https://static.mytuner.mobi/media/tvos_radios/GPH3E7t6Wy.png',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'https://ais-sa1.streamon.fm/7251_64k.mp3'
        },
        {
            md5: 9,
            artist: 'Calgary, Canada',
            album: 'Radio',
            title: 'CBC Radio One',
            cover: 'https://ca.radio.net/images/broadcasts/8f/25/34613/1/c300.png',
            playtime_seconds: 0,
            playtime_string: null,
            src:
                'https://cbcradiolive.akamaized.net/hls/live/2041039/ES_R1MCG/master.m3u8'
        },
        {
            md5: 10,
            artist: 'Edmonton, Canada',
            album: 'Radio',
            title: 'CBC Radio Two',
            cover: 'https://www.radio.net/images/broadcasts/80/11/4615/1/c300.png',
            playtime_seconds: 0,
            playtime_string: null,
            src:
                'https://cbcradiolive.akamaized.net/hls/live/2041058/ES_R2MED/master.m3u8'
        },
        {
            md5: 11,
            artist: 'Edmonton, Canada',
            album: 'Radio',
            title: '100.3 The Bear',
            cover: 'https://static.mytuner.mobi/media/tvos_radios/YRzxzyWAHF.png',
            playtime_seconds: 0,
            playtime_string: null,
            src: 'https://24963.live.streamtheworld.com/CFBRFM_ADP.aac'
        },
        {
            md5: 12,
            artist: 'Victoria, Canada',
            album: 'Radio',
            title: 'JACK 103.1',
            cover: 'https://cdn-profiles.tunein.com/s11996/images/logog.png',
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
