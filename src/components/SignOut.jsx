import { useContext, useEffect } from "react";
import { SopranoContext } from "./Soprano";

const SignOut = () => {
    const { dispatch } = useContext(SopranoContext);

    useEffect(() => {
        dispatch({ type: 'setUser', payload: null })
    }, [])
    return (
        <>
            <h2 className="header">Goodbye</h2>
            <p>You are now signed out.</p>
        </>
    );
};

export default SignOut;
