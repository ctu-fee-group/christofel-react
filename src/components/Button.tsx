import {FC} from 'react';
import styles from './Button.module.css';
import Link from "next/link";

interface ButtonProps {
    href: string;
    success: boolean;
    disabled: boolean;
    children: any;
}

const Button : FC<ButtonProps> = (props) => {
    let classes = [styles.button];
    if (props.success) {
        classes.push(styles.success);
    }

    if (props.disabled) {
        classes.push(styles.disabled);
    }

    return (
        <Link href={props.href}>
            <a className={classes.join(' ')}>
                {props.children}
            </a>
        </Link>
    );
}

export default Button;