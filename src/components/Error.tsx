import {FC} from 'react';
import Image from "next/image";
import styles from "./Error.module.css";
import boxStyles from "./Box.module.css";
import Button from "./Button";

interface ErrorProps {
    redirectUri?: string;
    message: string;
}

const Error: FC<ErrorProps> = ({message, redirectUri}) => {
    let redirectButton;
    if (redirectUri) {
        redirectButton = <div className={boxStyles.button_box}>
            <Button href={redirectUri} success={false} disabled={false}>Zpátky</Button>
        </div>
    }

    return (<div className={styles.error_bg}>
        <div className={styles.error_box}>
            <div className={styles.centered_img}>
                <Image src="/img/christofelerror.png" width={70} height={70}/>
            </div>
            <h1 className={styles.smaller}>Chyba</h1>
            <h2>{message}</h2>
            {redirectButton}
        </div>
    </div>);
}

Error.defaultProps = {
    redirectUri: undefined
}

export default Error;