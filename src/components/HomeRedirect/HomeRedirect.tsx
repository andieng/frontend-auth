import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './HomeRedirect.module.scss';

const cx = classNames.bind(styles);

function HomeRedirect() {
    return (
        <div className={cx("home-redirect")}>
            <Link to="/">Home</Link>
        </div>
    );
}

export default HomeRedirect;