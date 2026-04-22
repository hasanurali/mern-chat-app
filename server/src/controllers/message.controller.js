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