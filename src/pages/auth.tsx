import { FC } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { RingLoader } from 'react-spinners';
import * as Sentry from '@sentry/nextjs';
import RegisterBox from '../components/RegisterBox';
import {
  RegistrationCodeVerification,
  VerifyRegistrationCodePayload,
  VerifyRegistrationCodeQuery,
} from '../data/VerifyRegistrationCode';
import UserErrors from '../components/UserErrors';
import { getUserErrors, isError } from '../data/graphql';

const Auth: FC = () => {
  const router = useRouter();
  let code = router.query.code?.toString();
  const autoredirect = router.query.autoredirect !== undefined;
  const { data, loading, error } = useQuery<VerifyRegistrationCodePayload>(
    VerifyRegistrationCodeQuery,
    {
      variables: {
        code,
      },
      skip: code == null,
    }
  );

  let ctuSuccess = false;
  let discordSuccess = false;

  if (!router.isReady) {
    return <RingLoader color="#0065bd" size={100} />;
  }

  if (code) {
    if (loading) {
      return <RingLoader color="#0065bd" size={100} />;
    }

    if (isError(data, error) || !data) {
      Sentry.captureException({
        errors: error,
        userErrors: getUserErrors(data),
      });
      return (
        <UserErrors
          responseData={data}
          apolloError={error}
          defaultMessage="Došlo k chybě při načítání stavu registrace."
        />
      );
    }

    switch (data.verifyRegistrationCode.verificationStage) {
      case RegistrationCodeVerification.DiscordAuthorized:
      case RegistrationCodeVerification.CtuAuthorized:
        discordSuccess = true;
        break;
      case RegistrationCodeVerification.Done:
        discordSuccess = true;
        ctuSuccess = true;
        break;
      case RegistrationCodeVerification.NotValid:
        router.push('/auth');
        code = undefined;
        break;
      default:
        // ignore
        break;
    }
  }

  if (autoredirect) {
    const discordOauthUrl = RegisterBox.createCodeUrl(
      process.env.oauthDiscordUrl,
      code
    );
    const ctuOauthUrl = RegisterBox.createCodeUrl(
      process.env.oauthCtuUrl,
      code
    );

    if (discordSuccess) {
      router.push(ctuOauthUrl);
    } else {
      router.push(discordOauthUrl);
    }

    return <RingLoader color="#0065bd" size={100} />;
  }

  return (
    <RegisterBox
      ctuSuccess={ctuSuccess}
      discordSuccess={discordSuccess}
      code={code}
    />
  );
};

export default Auth;
