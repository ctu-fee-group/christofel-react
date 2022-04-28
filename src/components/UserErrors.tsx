import { FC } from 'react';
import { ApolloError } from '@apollo/client';
import UserError from '../data/UserError';
import Error from './Error';
import { getUserErrors } from '../data/graphql';
import UserErrorCode from '../data/UserErrorCode';

interface UserErrorProps {
  userErrors?: UserError[];
  responseData?: any;
  apolloError?: ApolloError;
  defaultMessage?: string;
  redirectUri?: string;
}

const getErrorMessage = (error: UserError): string => {
  switch (error.errorCode) {
    case UserErrorCode.InvalidRegistrationCode:
      return 'Registrační kód je neplatný, zkuste se ověřit znovu, jinak se ozvěte v kanále #podpora.';
    case UserErrorCode.OauthTokenRejected:
      return 'Ověřovací kód ze třetí strany je neplatný, zkuste se ověřit znovu, jinak se ozvěte v kanále #podpora.';
    case UserErrorCode.RejectedDuplicateUser:
      return 'Na serveru již existuje jiný Discord uživatel ověřený s tímto ČVUT účtem. Pokud chcete své ověření převést na aktuálně přihlášený Discord účet nebo si myslíte, že došlo k chybě, ozvěte se adminům v kanále #podpora.';
    case UserErrorCode.SoftAuthError:
      return 'Došlo k chybě při ukládání údajů, zkuste se ověřit znovu, jinak se ozvěte v kanále #podpora.';
    case UserErrorCode.UserNotInGuild:
      return 'Discord účet, který se snažíte ověřit, není na FEL Discord serveru. Ověřte, zda se ověřujete za správného uživatele.';
    case UserErrorCode.Unspecified:
      return 'Došlo k nespecifikované chybě. Ozvěte se do kanálu #podpora.';
    default:
      return error.message;
  }
};

const UserErrors: FC<UserErrorProps> = ({
  responseData,
  defaultMessage,
  userErrors: userErrors1,
  redirectUri,
  apolloError,
}) => {
  let message = defaultMessage ?? 'Chyba';

  let userErrors = null;
  if (responseData) {
    userErrors = getUserErrors(responseData);
  } else if (userErrors1) {
    userErrors = userErrors1;
  }

  if (userErrors?.length) {
    message = userErrors?.map((x) => getErrorMessage(x)).join(' ');
  } else if (apolloError) {
    message = 'Došlo k chybě při komunikaci s API.';
  }

  return <Error message={message} redirectUri={redirectUri} />;
};

UserErrors.defaultProps = {
  userErrors: undefined,
  responseData: undefined,
  apolloError: undefined,
  defaultMessage: 'Chyba',
  redirectUri: undefined,
};

export default UserErrors;
