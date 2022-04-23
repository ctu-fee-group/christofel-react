import NextHead from 'next/head';
import {Component, FC} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import styles from "./Error.module.css";
import boxStyles from "./Box.module.css";
import Button from "./Button";

interface ErrorProps {
    redirect_uri?: string;
    message: string;
}

const Error: FC<ErrorProps> = (props) => {
    let redirectButton = undefined;
    if (props.redirect_uri) {
        redirectButton = <div className={boxStyles.button_box}>
            <Button href={props.redirect_uri} success={false} disabled={false}>Zpátky</Button>
        </div>
    }

    return (<div className={styles.error_bg}>
        <div className={styles.error_box}>
            <img src="/img/christofelerror.png" width={50} className={styles.centered_img}/>
            <h1 className={styles.smaller}>Chyba</h1>
            <h2>{props.message}</h2>
            {redirectButton}
        </div>
    </div>);
}

export default Error;