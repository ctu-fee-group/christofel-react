import NextHead from 'next/head';
import {Component, FC} from 'react';
import styles from './Box.module.css';
import Box from "./Box";
import Button from "./Button";

interface RegisterBoxProps {
    code?: string
    discordSuccess: boolean;
    ctuSuccess: boolean;
}

class RegisterBox extends Component<RegisterBoxProps> {
    private createCodeUrl(url: string|undefined, code?: string|undefined) : string
    {
        if (url == undefined){
            return "url not set";
        }

        try {
            var urlObj = new URL(url);
            if (code != null) {
                urlObj.searchParams.append('state', code);
            }
            return urlObj.toString();
        }
        catch {
            return "could not generate url";
        }
    }

    render() {
        let discordOauthUrl = this.createCodeUrl(process.env.oauthDiscordUrl, this.props.code);
        let ctuOauthUrl = this.createCodeUrl(process.env.oauthCtuUrl, this.props.code);

        return (
            <Box title="FEL" subtitle="Discord server">
                <div className={styles.button_box}>
                    {this.props.ctuSuccess && this.props.discordSuccess && <h2>Nyní můžeš okno zavřít a vrátit se na server.</h2>}
                </div>

                <div className={styles.button_box}>
                    <h2>Krok 1.</h2>
                    <Button href={discordOauthUrl} success={this.props.discordSuccess} disabled={false}>
                        Discord přihlášení
                    </Button>

                    <h2>Krok 2.</h2>
                    <Button href={ctuOauthUrl} success={this.props.ctuSuccess} disabled={!this.props.discordSuccess}>
                        ČVUT přihlášení
                    </Button>
                </div>
            </Box>
        );
    }
}

export default RegisterBox;