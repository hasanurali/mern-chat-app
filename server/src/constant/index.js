// <---STATUS CODES--->
module.exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    DUPLICATE_KEY: 409
};

// <---BCRYPT_SALT_ROUNDS--->
module.exports.BCRYPT_SALT_ROUNDS = 10;

// <---SOCKET EVENTS--->
module.exports.ChatEventEnum = {

    CONNECTED_EVENT: "connection",
    DISCONNECT_EVENT: "disconnect",
    SOCKET_ERROR_EVENT: "socketError",

    NEW_CHAT_EVENT: "newChat",
    USER_JOINED_CHAT_EVENT: "userJoinedChat",
    USER_LEFT_CHAT_EVENT: "userLeftChat",
    UPDATE_GROUP_NAME_EVENT: "updateGroupName",
    DELETE_CHAT_EVENT: "deleteChat",

    JOIN_CHAT_EVENT: "joinChat",
    LEAVE_CHAT_EVENT: "leaveChat",

    RECIVE_MESSAGE: "reciveMessage",
    DELETE_MESSAGE: "deleteMessage",
    CHANGE_STATUS: "changeStatus"
};