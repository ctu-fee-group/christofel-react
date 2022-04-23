/// <summary>
/// Codes of <see cref="UserError"/> for distinguishing between different types of errors.
/// </summary>
enum UserErrorCode
{
    /// <summary>
    /// Error of unknown type that cannot be shown to the user.
    /// </summary>
    Unspecified = "UNSPECIFIED",

    /// <summary>
    /// Token was rejected (or 500 from oauth handler).
    /// </summary>
    OauthTokenRejected = "OAUTH_TOKEN_REJECTED",

    /// <summary>
    /// User trying to authenticate is a rejected duplicate.
    /// </summary>
    /// <remarks>
    /// The user must contact the administrators in order to be allowed authentication.
    /// </remarks>
    RejectedDuplicateUser = "REJECTED_DUPLICATE_USER",

    /// <summary>
    /// The user trying to log in is not in the correct guild.
    /// </summary>
    UserNotInGuild = "USER_NOT_IN_GUILD",

    /// <summary>
    /// The given registration code is not valid.
    /// </summary>
    /// <remarks>
    /// The code may have been already used successfully, it has expired or was destroyed manually.
    /// </remarks>
    InvalidRegistrationCode = "INVALID_REGISTRATION_CODE",

    /// <summary>
    /// The auth process itself was successful, but there was an error in tasks stage.
    /// </summary>
    /// <remarks>
    /// The user cannot be returned to the last step, he has to go over the whole authentication process again
    /// in order to try to work around this error.
    /// </remarks>
    SoftAuthError = "SOFT_AUTH_ERROR",
}

export default UserErrorCode;