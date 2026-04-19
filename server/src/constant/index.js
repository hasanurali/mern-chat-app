// <---STATUS CODES--->
module.exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    DUPLICATE_KEY: 409
};

// <---BCRYPT_SALT_ROUNDS--->
module.exports.BCRYPT_SALT_ROUNDS = 10;

// <---SOCKET EVENTS--->
module.exports.ChatEventEnum = {
    CONNECTED_EVENT: "connection",
    DISCONNECT_EVENT: "disconnect",
    NEW_CHAT_EVENT: "newChat",
    JOIN_CHAT_EVENT: "joinChat",
    LEAVE_CHAT_EVENT: "leaveChat",
    UPDATE_GROUP_NAME_EVENT: "updateGroupName",
    SOCKET_ERROR_EVENT: "socketError",
};