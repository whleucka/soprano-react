import { useContext } from 'react';
import { SopranoContext } from './Soprano';

const Options = () => {
    const { state, dispatch } = useContext(SopranoContext);

    const handleShuffle = (e) => {
        // We could toggle w/ !state.shuffle, but let's be explicit for now
        if (e.currentTarget.value === 'on') {
            dispatch({ type: 'setShuffle', payload: true });
        } else {
            dispatch({ type: 'setShuffle', payload: false });
        }
    };

    return (
        <>
            <h2 className="header">Options</h2>
            <br />
            <h4>Music Player</h4>
            <div className="d-flex">
                <div className="p-2 w-100 d-flex align-items-center">
                    Shuffle
                </div>
                <div className="p-2 flex-shrink-1">
                    <div onClick={handleShuffle} className="form-check">
                        <input
                            className="form-check-input option-radio"
                            type="radio"
                            value="on"
                            name="shuffle"
                            id="shuffle-on"
                            defaultChecked={state.shuffle === true}
                        />
                        <label className="form-check-label">On</label>
                    </div>
                    <div onClick={handleShuffle} className="form-check">
                        <input
                            className="form-check-input option-radio"
                            type="radio"
                            value="off"
                            name="shuffle"
                            id="shuffle-off"
                            defaultChecked={state.shuffle === false}
                        />
                        <label className="form-check-label">Off</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Options;
