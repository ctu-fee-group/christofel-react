import {ApolloError} from "@apollo/client";
import UserErrors from "../components/UserErrors";
import UserError from "./UserError";

export const isError = (data: any, error?: ApolloError): boolean => {
    return (error || (data && data[Object.keys(data)[0]].errors?.length)) && true;
}

export const getUserErrors = (data: any): UserError[] => {
    return data && data[Object.keys(data)[0]].errors;
}