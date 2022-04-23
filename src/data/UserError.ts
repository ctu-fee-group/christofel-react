import UserErrorCode from "./UserErrorCode";

interface UserError {
    errorCode: UserErrorCode;
    message: string;
}

export default UserError;