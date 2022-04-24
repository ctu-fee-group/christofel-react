import {FC} from 'react';
import {ApolloError} from "@apollo/client";
import UserError from "../data/UserError";
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
        default:
            return error.message;
    }
}

const UserErrors: FC<UserErrorProps> = ({
                                            responseData,
                                            defaultMessage,
                                            userErrors: userErrors1,
                                            redirectUri,
                                            apolloError
                                        }) => {
    let message = defaultMessage ?? "Chyba";

    let userErrors = null;
    if (responseData) {
        userErrors = getUserErrors(responseData);
    } else if (userErrors1) {
        userErrors = userErrors1;
    }

    if (userErrors?.length) {
        message = userErrors?.map(x => getErrorMessage(x)).join(' ');
    } else if (apolloError) {
        message = "Došlo k chybě při komunikaci s API.";
    }

    return <Error message={message} redirectUri={redirectUri}/>;
}

UserErrors.defaultProps = {
    userErrors: undefined,
    responseData: undefined,
    apolloError: undefined,
    defaultMessage: "Chyba",
    redirectUri: undefined,
};

export default UserErrors;