import { useEffect, useContext } from 'react';
import API from './API';
import { SopranoContext } from './Soprano';
import { useLocalStorage } from './useLocalStorage';
import Cookies from 'js-cookie';

const User = () => {
    const { dispatch } = useContext(SopranoContext);
    const [user] = useLocalStorage('uuid', '');
    const user_cookie = Cookies.get('uuid');
    useEffect(() => {
        const uuid = user || user_cookie || null;
        // Load user, if possible
        if (uuid) {
            API.loadUser(uuid)
                .then((res) => {
                    dispatch({ type: 'setUser', payload: res.uuid });
                })
                .catch(console.log);
        }
    }, []);
};

export default User;
