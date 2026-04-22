const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/apiResponse')
const { HTTP_STATUS, ChatEventEnum } = require('../constant/index')
const messageService = require('../services/message.service')

module.exports.createMessage = asyncHandler(async (req, res) => {

    const chatId = req.params.id;
    const senderId = req.user._id;
    const message = req.body.message;
    const status = req.body.status || undefined;
    const io = req.app.get('io')

    const { message: newMessage, chat } = await messageService.createMessage({ senderId, message, chatId, status });

    chat.participants.forEach(id => {
        if (!id.equals(senderId)) {
            io.to(id.toString()).emit(ChatEventEnum.RECIVE_MESSAGE, newMessage)
        }
    });

    return res.status(HTTP_STATUS.CREATED)
        .json(new ApiResponse(HTTP_STATUS.CREATED, "Message sended", newMessage));

});

module.exports.fetchMessages = asyncHandler(async (req, res) => {

    const chatId = req.params.id;
    const userId = req.user._id;

    const getMessages = await messageService.getMessages({ userId, chatId });

    return res.status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, "Message fetched", getMessages));

});

module.exports.updateMessageStatus = asyncHandler(async (req, res) => {

    const chatId = req.params.id;
    const userId = req.user._id;
    const io = req.app.get('io')

    const messages = await messageService.updateMessageStatus({ userId, chatId });

    if (messages.modifiedCount > 0) {
        io.to(chatId.toString()).except(userId.toString()).emit(ChatEventEnum.CHANGE_STATUS, { chatId });
    };

    const isUpdate = messages.modifiedCount > 0;

    return res.status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, "Message seened", { chatId, update: isUpdate }));

});

module.exports.deleteMessage = asyncHandler(async (req, res) => {

    const messageId = req.params.id;
    const userId = req.user._id;
    const io = req.app.get('io')

    const chatId = await messageService.deleteMessage({ userId, messageId });

    io.to(chatId.toString()).except(userId.toString()).emit(ChatEventEnum.DELETE_MESSAGE, { chatId, messageId });

    return res.status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, "Message deleted", { messageId }));

});