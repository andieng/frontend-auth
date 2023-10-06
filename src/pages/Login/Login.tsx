import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import classNames from 'classnames/bind';
import { useCookies } from "react-cookie"
import Form from 'src/components/Form';
import styles from './Login.module.scss';
import HomeRedirect from 'src/components/HomeRedirect';
import { Login as LoginApi } from 'src/api/auth';

const cx = classNames.bind(styles);

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies, setCookie] = useCookies(["accessToken", "username", "fullname", "role", "isLoggedIn"]);
    const navigate = useNavigate();
    
    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const res = await LoginApi({ username, password });
        if (res?.accessToken) {
            setCookie("accessToken", res?.accessToken);
            setCookie("username", res?.username)
            setCookie("fullname", res?.fullname)
            setCookie("role", res?.role)
            setCookie("isLoggedIn", true);
            setIsLoggedIn(true)
        }
        else {
            alert("Log in failed")
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/", {
                replace: true
            })
        }
    }, [isLoggedIn])

    return (
        <div className={cx('wrapper')}>
            <HomeRedirect />
            <div className={cx("form-container")}>
                <Form title="Log in">
                    <input 
                        value={username}
                        type="username"
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
                    <button className={cx("submit-btn")} onClick={(e) => handleLogin(e)}>Log in</button>
                </Form>
                <span className={cx("redirect")}>
                    Don't have an account?&nbsp;
                    <Link className={cx("to-signup")} to="/signup">Sign up</Link>
                </span>
            </div>
        </div>
    );
}

export default Login;
