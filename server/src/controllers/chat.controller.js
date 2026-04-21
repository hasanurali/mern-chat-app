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

    io.to(id.toString()).emit(ChatEventEnum.NEW_CHAT_EVENT, chat);

    return res.status(HTTP_STATUS.CREATED)
        .json(new ApiResponse(HTTP_STATUS.CREATED, "Chat Created", chat));

});

module.exports.createGroupChat = asyncHandler(async (req, res) => {

    const { name, participants } = req.body;
    const chatAdmin = req.user._id
    const io = req.app.get('io')

    const chat = await chatService.createGroupChat({ name, participants, chatAdmin })

    chat.participants.forEach(({ _id }) => {
        if (!_id.equals(chatAdmin._id)) {
            io.to(_id.toString()).emit(ChatEventEnum.NEW_CHAT_EVENT, chat)
        }
    });

    return res.status(HTTP_STATUS.CREATED)
        .json(new ApiResponse(HTTP_STATUS.CREATED, "Group Created", chat));

});

module.exports.fetchChats = asyncHandler(async (req, res) => {

    const user = req.user;

    const chats = await chatService.fetchChats(user._id);

    return res.status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, "Chats fetched", chats));

});

module.exports.fetchChat = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const chatId = req.params.id;

    const chat = await chatService.fetchChat({ userId, chatId });

    return res.status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, "Chat fetched", chat));

});