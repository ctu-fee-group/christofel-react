import {gql} from "@apollo/client";
import UserError from "./UserError";

export const RegisterDiscordMutation = gql`
mutation RegisterDiscord($oauthCode: String!, $redirectUri: String!) {
    registerDiscord(input: { oauthCode: $oauthCode, redirectUri: $redirectUri }) {
        errors {
            errorCode
            message
        }
        registrationCode
    }
}
`;

interface RegisterDiscordInnerPayload
{
    errors: UserError[];
    registrationCode: string;
}

export interface RegisterDiscordPayload
{
    registerDiscord: RegisterDiscordInnerPayload;
}