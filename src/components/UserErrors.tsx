import {FC} from 'react';
import UserError from "../data/UserError";
import {ApolloError} from "@apollo/client";
import Error from "./Error";
import {getUserErrors} from "../data/graphql";
import UserErrorCode from "../data/UserErrorCode";

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
            return "Registrační kód je neplatný, zkuste se ověřit znovu.";
        case UserErrorCode.OauthTokenRejected:
            return "Ověřovací kód ze třetí strany je neplatný, zkuste se ověřit znovu.";
        case UserErrorCode.RejectedDuplicateUser:
            return "Byla detekována duplicita, ozvěte se adminům v kanále #podpora, pokud se chcete ověřit na novém účtě nebo myslíte, že došlo k chybě.";
        case UserErrorCode.SoftAuthError:
            return "Došlo k chybě při ukládání vašich údajů. Ověřte se znovu.";
        case UserErrorCode.UserNotInGuild:
            return "Uživatel, za kterého se snažíte přihlásit, není na FEL Discord serveru. Ověřte, že se ověřujete za správného uživatele.";
        case UserErrorCode.Unspecified:
            return "Došlo k nespecifikované chybě. Ozvěte se do kanálu #podpora.";
    }

    return error.message;
}

const UserErrors: FC<UserErrorProps> = (props) => {
    let message = props.defaultMessage ?? "Chyba";

    let userErrors = null;
    if (props.responseData) {
        userErrors = getUserErrors(props.responseData);
    } else if (props.userErrors) {
        userErrors = props.userErrors;
    }

    if (userErrors?.length) {
        message = userErrors?.map(x => getErrorMessage(x)).join(' ');
    } else if (props.apolloError) {
        message = "Došlo k chybě při komunikaci s API.";
    }

    return <Error message={message} redirect_uri={props.redirectUri} />;
}

export default UserErrors;