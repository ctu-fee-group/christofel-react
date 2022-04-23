import {gql} from "@apollo/client";
import UserError from "./UserError";

export const RegisterCtuMutation = gql`
mutation RegisterCtu($oauthCode: String!, $registrationCode: String!, $redirectUri: String!) {
    registerCtu(input: { oauthCode: $oauthCode, registrationCode: $registrationCode, redirectUri: $redirectUri }) {
        errors {
            errorCode
            message
        }
    }
}
`;

interface RegisterCtuInnerPayload
{
    errors: UserError[];
}

export interface RegisterCtuPayload
{
    registerCtu: RegisterCtuInnerPayload;
}