import { useEffect, useContext } from "react";
import API from './API';
import { SopranoContext } from "./Soprano";
import { useLocalStorage } from './useLocalStorage';

const User = () => {
    const {dispatch} = useContext(SopranoContext);
    const [user] = useLocalStorage('uuid', '');
    useEffect(() => {
        // Load user, if possible
        if (user) {
            API.loadUser(user)
                .then((res) => {
                    dispatch({ type: 'setUser', payload: res.uuid });
                })
                .catch(console.log);
        }
    });
};

export default User;
