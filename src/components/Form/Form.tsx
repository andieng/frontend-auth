import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import { Props } from 'src/types/types';

const cx = classNames.bind(styles);

function Form({children, title}: Props) {
    return (            
        <form className={cx("form")}>
            <h2 className={cx("title")}>{title}</h2>
            {children}
        </form> 
    );
}

export default Form;