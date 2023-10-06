import { Link } from 'react-router-dom';
import { MouseEventHandler, useState } from 'react';
import classNames from 'classnames/bind';
import Form from 'src/components/Form';
import styles from './Signup.module.scss';
import HomeRedirect from 'src/components/HomeRedirect';
import { Signup as SignupApi } from 'src/api/auth';

const cx = classNames.bind(styles);

function Signup() {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cfPassword, setCfPassword] = useState("");

    const validate = () => {
        if (username && password && cfPassword
            && fullname && cfPassword === password) {
            return true;
        }
        return false;
    }

    const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validate()) {
            alert("Info not valid");
            return;
        } 
        console.log({ fullname, username, password })
        const res = await SignupApi({ fullname, username, password });
        console.log(res)
        if (res?.username) {
            alert("Sign up successfully");
        }
        else {
            alert("Sign up failed");
        }
    }

    return (
        <div className={cx('wrapper')}>
            <HomeRedirect />
            <div className={cx("form-container")}>
                <Form title="Sign up">
                    <input
                        value={fullname}
                        type="text"
                        name="fullname" 
                        placeholder="Full Name" 
                        onChange={(e) => setFullname(e.target.value)}
                        required 
                    />
                    <input
                        value={username}
                        type="text" 
                        name="username" 
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input
                        value={password}
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        value={cfPassword}
                        type="password" 
                        name="cfPassword" 
                        placeholder="Confirm password"
                        onChange={(e) => setCfPassword(e.target.value)}
                        required 
                    />
                    <button className={cx("submit-btn")} onClick={(e) => handleSignup(e)}>Sign up</button>
                </Form>
                <span className={cx("redirect")}>
                    Already a user?&nbsp;
                    <Link className={cx("to-login")} to="/login">Log in</Link>
                </span>
            </div>
        </div>
    );
}

export default Signup;
