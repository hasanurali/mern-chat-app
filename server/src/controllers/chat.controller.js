const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/apiResponse')
const { HTTP_STATUS, ChatEventEnum } = require('../constant/index')
const chatService = require('../services/chat.service')

module.exports.createOneToOneChat = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const chatCreator = req.user._id
    const io = req.app.get('io')

    const { chat, isNewChat } = await chatService.createOneToOneChat({ id, chatCreator })

    if (!isNewChat) {
        return res.status(HTTP_STATUS.OK)
            .json(new ApiResponse(HTTP_STATUS.OK, "Chat fetched", chat));
    }

    chat.participants.forEach(({ _id }) => {
        if (!_id.equals(chatCreator)) {
            io.to(_id.toString()).emit(ChatEventEnum.JOIN_CHAT_EVENT, chat)
        }
    });

    return res.status(HTTP_STATUS.CREATED)
        .json(new ApiResponse(HTTP_STATUS.CREATED, "Chat Created", chat));

});
