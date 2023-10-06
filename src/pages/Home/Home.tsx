import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";
import { Logout } from 'src/api/auth';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [cookie, setCookie, removeCookie] = useCookies(["isLoggedIn", "role", "accessToken", "username", "fullname"]);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const navigate = useNavigate();
    let role;
    if (cookie?.role) {
        role = cookie?.role[0].toUpperCase() + cookie?.role.substr(1);
    }

    const handleLogout = async () => {
        const res = await Logout(cookie.accessToken);
        if (res.logout) {
            removeCookie("isLoggedIn")
            removeCookie("role")
            removeCookie("accessToken")
            removeCookie("fullname")
            removeCookie("username")
            setIsLoggedOut(true);
        }
    }
    useEffect (() => {
        if (isLoggedOut) {
            navigate("/", {
                replace: true
            })
        }
    }, [isLoggedOut])

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx("title")}>{role} Home</h1>
            <div className={cx("btn-container")}>
                {cookie?.isLoggedIn ? 
                    <>
                        <Link className={cx("primary-btn")} to="/profile">Profile</Link>
                        {cookie.role === "admin" && <Link className={cx("primary-btn")} to="/user">Get users</Link>}
                        <Link className={cx("secondary-btn")} to="/" onClick={handleLogout}>Log out</Link>
                    </>
                    :
                    <>
                        <Link className={cx("primary-btn")} to="/signup">Sign up</Link>
                        <Link className={cx("secondary-btn")} to="/login">Log in</Link>
                    </>
                }
            </div>
        </div>
    );
}

export default Home;
