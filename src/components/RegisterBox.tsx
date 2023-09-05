import { Component } from 'react';
import styles from './Box.module.css';
import Box from './Box';
import Button from './Button';

interface RegisterBoxProps {
  code?: string;
  discordSuccess: boolean;
  ctuSuccess: boolean;
}

class RegisterBox extends Component<RegisterBoxProps> {
  static defaultProps = {
    code: undefined,
  };

  public static createCodeUrl(
    url: string | undefined,
    code?: string | undefined
  ): string {
    if (!url) {
      return 'url not set';
    }

    try {
      const urlObj = new URL(url);
      if (code != null) {
        urlObj.searchParams.append('state', code);
      }
      return urlObj.toString();
    } catch {
      return 'could not generate url';
    }
  }

  render() {
    const { code, discordSuccess, ctuSuccess } = this.props;
    const discordOauthUrl = RegisterBox.createCodeUrl(
      process.env.oauthDiscordUrl,
      code
    );
    const ctuOauthUrl = RegisterBox.createCodeUrl(
      process.env.oauthCtuVariant === 'fel'
        ? process.env.oauthCtuFelUrl
        : process.env.oauthCtuFitUrl,
      code
    );

    return (
      <Box title="FEL" subtitle="Discord server">
        <div className={styles.button_box}>
          <h2>Krok 1.</h2>
          <Button
            href={discordOauthUrl}
            success={discordSuccess}
            disabled={false}
          >
            Discord přihlášení
          </Button>

          <h2>Krok 2.</h2>
          <Button
            href={ctuOauthUrl}
            success={ctuSuccess}
            disabled={!discordSuccess}
          >
            ČVUT přihlášení
          </Button>

          {ctuSuccess && discordSuccess && (
            <>
              <h2>Úspěšné ověření</h2>
              <h2 className={styles.smaller}>
                Nyní můžeš okno zavřít a vrátit se na server.
              </h2>
            </>
          )}
        </div>
      </Box>
    );
  }
}

export default RegisterBox;
