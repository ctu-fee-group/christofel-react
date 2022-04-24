import {FC} from 'react';
import styles from './Box.module.css';

interface BoxProps {
    title: string;
    subtitle: string;
    children: any;
}

const Box: FC<BoxProps> = ({title, subtitle, children}) => (
    <div className={styles.box}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>

        {children}
    </div>
)

export default Box;