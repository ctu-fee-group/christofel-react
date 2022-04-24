import {ApolloError} from "@apollo/client";
import UserError from "./UserError";

export const isError = (data: any, error?: ApolloError): boolean => (error || (data && data[Object.keys(data)[0]].errors?.length)) && true

export const getUserErrors = (data: any): UserError[] => data && data[Object.keys(data)[0]].errors