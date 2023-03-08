import { useContext } from 'react';
import { SopranoContext } from './Soprano';

const Options = () => {
    const { state, dispatch } = useContext(SopranoContext);

    return (
        <>
            <h2 className="header">Options</h2>
            <br />
        </>
    );
};

export default Options;
