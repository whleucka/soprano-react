import PodcastSearchInput from './PodcastSearchInput';
import PodcastSearchResults from './PodcastSearchResults';

const Podcasts = () => {
    return (
        <>
            <h2 className="header">
                Podcasts{' '}
                <img
                    style={{ height: '24px', paddingLeft: '5px' }}
                    src="/img/listennotes.png"
                    alt="listen notes"
                    title="Listen Notes"
                />
            </h2>
            <PodcastSearchInput />
            <PodcastSearchResults />
        </>
    );
};

export default Podcasts;
