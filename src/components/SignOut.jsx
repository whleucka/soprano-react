import { useContext, useEffect } from "react";
import { SopranoContext } from "./Soprano";
import { useLocalStorage } from './useLocalStorage';

const SignOut = () => {
    const { dispatch } = useContext(SopranoContext);
    const [, setUser] = useLocalStorage("uuid", "");

    useEffect(() => {
        dispatch({ type: 'setUser', payload: null })
        setUser(null);
    }, [])
    return (
        <>
            <h2 className="header">Goodbye</h2>
            <p>You are now signed out.</p>
        </>
    );
};

export default SignOut;
