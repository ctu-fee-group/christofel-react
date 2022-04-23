import {Component, FC} from 'react';
import styles from './Box.module.css';

interface BoxProps {
    title: string;
    subtitle: string;
    children: any;
}

const Box: FC<BoxProps> = (props) => {
    return (
        <div className={styles.box}>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>

            {props.children}
        </div>
    );
}

export default Box;