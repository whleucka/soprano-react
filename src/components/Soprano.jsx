import React, { useReducer, useMemo } from 'react';
import { SopranoReducer } from './SopranoReducer';
import { InitialState } from './InitialState';
import Layout from './Layout';
import User from './User';

export const SopranoContext = React.createContext();

const Soprano = () => {
    const [state, dispatch] = useReducer(SopranoReducer, InitialState);

    const ContextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <SopranoContext.Provider value={ContextValue}>
            <User />
            <Layout />
        </SopranoContext.Provider>
    );
};

export default Soprano;
