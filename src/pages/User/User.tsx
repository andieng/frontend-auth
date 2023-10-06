import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { GetUsers } from 'src/api/user';
import styles from './User.module.scss';

const cx = classNames.bind(styles);

function User() {
    const [cookie, setCookies] = useCookies(["accessToken"])
    const [users, setUsers] = useState([]);
    useEffect(() => {
        GetUsers(cookie?.accessToken).then((data) => {
            return setUsers(data)
        })
    }, [])

    return (
        <div className={cx('wrapper')}>
            {JSON.stringify(users)}
            <Link className={cx("back-btn")} to="/">Back</Link>
        </div>
    );
}

export default User;
