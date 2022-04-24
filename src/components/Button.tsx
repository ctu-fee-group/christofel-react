import {FC} from 'react';
import Link from "next/link";
import styles from './Button.module.css';

interface ButtonProps {
    href: string;
    success: boolean;
    disabled: boolean;
    children: any;
}

const Button: FC<ButtonProps> = ({success, disabled, href, children}) => {
    const classes = [styles.button];
    if (success) {
        classes.push(styles.success);
    }

    if (disabled) {
        classes.push(styles.disabled);
    }

    return (
        <Link href={href}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={classes.join(' ')}>
                {children}
            </a>
        </Link>
    );
}

export default Button;