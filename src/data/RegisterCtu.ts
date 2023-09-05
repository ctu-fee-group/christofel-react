import { gql } from '@apollo/client';
import UserError from './UserError';

export const RegisterCtuFitMutation = gql`
  mutation RegisterCtuFit(
    $oauthCode: String!
    $registrationCode: String!
    $redirectUri: String!
  ) {
    registerCtuFit(
      input: {
        oauthCode: $oauthCode
        registrationCode: $registrationCode
        redirectUri: $redirectUri
      }
    ) {
      errors {
        errorCode
        message
      }
    }
  }
`;

export const RegisterCtuFelMutation = gql`
  mutation RegisterCtuFel(
    $oauthCode: String!
    $registrationCode: String!
    $redirectUri: String!
  ) {
    registerCtuFel(
      input: {
        oauthCode: $oauthCode
        registrationCode: $registrationCode
        redirectUri: $redirectUri
      }
    ) {
      errors {
        errorCode
        message
      }
    }
  }
`;

interface RegisterCtuInnerPayload {
  errors: UserError[];
}

export interface RegisterCtuPayload {
  registerCtu: RegisterCtuInnerPayload;
}
