import { useContext, useState } from 'react';
import { Info as InfoIcon } from 'react-feather';
import API from './API';
import { SopranoContext } from './Soprano';
import { useLocalStorage } from './useLocalStorage';

const SignIn = () => {
    const { dispatch } = useContext(SopranoContext);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [, setUser] = useLocalStorage("uuid", "");

    const handleAuthenticate = () => {
        setShowAlert(false);
        setShowSuccess(false);
        if (!email.trim()) {
            setEmailError(true);
            return;
        }
        if (!password.trim()) {
            setPasswordError(true);
            return;
        }
        API.signIn(email, password)
            .then(user => {
                if (user.uuid) {
                    setShowSuccess(true);
                    setPassword("");
                    setEmail("");
                    dispatch({ type: 'setUser', payload: user.uuid });
                    setUser(user.uuid);
                } else {
                    setShowAlert(true);
                }
            })
            .catch(err => {
                setShowAlert(true);
                console.log(err)
            });
    };

    return (
        <>
            <h2 className="header">Sign In</h2>
            <p>
                <small>
                    <InfoIcon size="14" /> Sign into your account to access
                    member-only features!
                </small>
            </p>
            {showAlert && (
                <div className="alert alert-warning my-3" role="alert">
                    Bad email and/or password
                </div>
            )}
            {showSuccess && (
                <div className="alert alert-success my-3" role="alert">
                    Success! You are now logged in!
                </div>
            )}
            <input
                type="email"
                value={email}
                onChange={(e) => {
                    setShowAlert(false);
                    setEmailError(false);
                    setEmail(e.currentTarget.value);
                }}
                className="email-input"
                placeholder="E-mail Address"
            />
            <br />
            {emailError && (
                <small>
                    <span className="text-danger">Invalid e-mail address</span>
                    <br />
                </small>
            )}
            <input
                type="password"
                value={password}
                onChange={(e) => {
                    setShowAlert(false);
                    setPasswordError(false);
                    setPassword(e.currentTarget.value);
                }}
                className="password-input"
                placeholder="Password"
            />
            <br />
            {passwordError && (
                <small>
                    <span className="text-danger">Invalid password</span>
                    <br />
                </small>
            )}
            <button
                onClick={handleAuthenticate}
                className="btn btn-secondary btn-sm border mt-3"
            >
                Authenticate
            </button>
        </>
    );
};

export default SignIn;
