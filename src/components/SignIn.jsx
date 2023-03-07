import { useState } from 'react';
import { Info as InfoIcon } from 'react-feather';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleAuthenticate = () => {
        setShowAlert(false);
        if (!email.trim()) {
            setEmailError(true);
            return;
        }
        if (!password.trim()) {
            setPasswordError(true);
            return;
        }
        setShowAlert(true);
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
                    <strong style={{ color: '#ff0000' }}>
                        <InfoIcon size="14" />
                    </strong>{' '}
                    This feature is currently disabled.
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
                placeholder="E-Mail Address"
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
