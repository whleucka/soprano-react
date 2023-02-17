import { useContext } from 'react';
import { SopranoContext } from './Soprano';
import TrackRow from './TrackRow';
import { Util } from './Util';

const PodcastResults = () => {
    const { state } = useContext(SopranoContext);
    return (
        <section id="podcast-search-results" className="mt-3">
            {state.podcastResults.length > 0 &&
                state.podcastResults.map((result, i) => {
                    const podcast = {
                        md5: i + '_podcast',
                        artist: result.podcast.title_original,
                        album: 'Soprano Podcast',
                        title: result.title_original,
                        cover: result.image,
                        playtime_seconds: result.audio_length_sec,
                        playtime_string: Util.convertSeconds(
                            result.audio_length_sec
                        ),
                        src: result.audio
                    };
                    return <TrackRow key={i} track={podcast} mode="podcast" />;
                })}
        </section>
    );
};

export default PodcastResults;
