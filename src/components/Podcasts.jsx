import PodcastSearch from './PodcastSearch';

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
            <PodcastSearch />
        </>
    );
};

export default Podcasts;
