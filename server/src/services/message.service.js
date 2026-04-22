const chatModel = require('../models/chat.model')
const messageModel = require('../models/message.model')
const { HTTP_STATUS } = require('../constant/index')
const ApiError = require('../utils/apiError')
const mongoose = require('mongoose')


const commonPopulate = {
    path: "user",
    select: "name profilePic"
};

module.exports.createMessage = async (data) => {

    const { senderId, message, chatId, status = undefined } = data;


    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid chat id");
    };

    const isChat = await chatModel.findById(chatId)
    if (!isChat) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Chat not found")
    }

    const newMessage = await messageModel.create({
        chat: chatId,
        user: senderId,
        message,
        status
    });

    const detailedMessage = await messageModel.findById(newMessage._id).populate(commonPopulate);
    return { message: detailedMessage, chat: isChat };
};
