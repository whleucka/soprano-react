import { useState, lazy } from 'react';
import "./stylesheets/main.css";

const Soprano = lazy(() => import('./components/Soprano'));
const SignIn = lazy(() => import('./components/SignIn'));

const App = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    return (
        <section id="wrapper">
            {loggedIn && <Soprano />}
            {!loggedIn && <SignIn />}
        </section>
    );
};

export default App;
