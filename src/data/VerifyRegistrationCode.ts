import UserError from "./UserError";
import {gql} from "@apollo/client";

export const VerifyRegistrationCodeQuery = gql`
  query VerifyRegistrationCode($code: String!) {
    verifyRegistrationCode(input: { registrationCode: $code }) {
        errors {
            errorCode
            message
        }
        verificationStage        
    }
  }
`;

export enum RegistrationCodeVerification {
    /// <summary>
    /// Code was not found, use registerDiscord.
    /// </summary>
    NotValid = "NOT_VALID",

    /// <summary>
    /// Code was found and only discord was registered, use registerCtu.
    /// </summary>
    DiscordAuthorized = "DISCORD_AUTHORIZED",

    /// <summary>
    /// Code was found and both discord and ctu were linked.
    /// The process was not finalized, maybe because of a duplicity.
    /// Use registerCtu.
    /// </summary>
    CtuAuthorized= "CTU_AUTHORIZED",

    /// <summary>
    /// This code was already used for registration and the user was successfully authenticated.
    /// This typically should not be returned as codes are removed after authentication is done.
    /// </summary>
    Done = "DONE",
}

export interface VerifyRegistrationCodeInnerPayload
{
    errors: UserError[];
    verificationStage: RegistrationCodeVerification;
}

export interface VerifyRegistrationCodePayload
{
    verifyRegistrationCode: VerifyRegistrationCodeInnerPayload;
}