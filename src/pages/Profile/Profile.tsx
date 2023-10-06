import classNames from 'classnames/bind';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const [cookie] = useCookies(["username", "fullname", "role", "accessToken"])
    const { username, fullname, role } = cookie;
    const userRole = role[0].toUpperCase() + role.substr(1);
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx("title")}>{userRole} Profile</h1>
            <h3>Full Name: {fullname}</h3>
            <h3>Username: {username}</h3>
            <Link className={cx("back-btn")} to="/">Back</Link>
        </div>
    );
}

export default Profile;
