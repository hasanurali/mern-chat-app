const userModel = require('../models/user.model')
const chatModel = require('../models/chat.model')
const { HTTP_STATUS } = require('../constant/index')
const ApiError = require('../utils/apiError')


const commonPopulate = {
    path: "participants",
    select: "name profilePic"
};

module.exports.createOneToOneChat = async (data) => {

    const { id, chatCreator } = data;

    if (!id) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Id is required")
    }

    const isUser = await userModel.exists({ _id: id })
    if (!isUser) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found")
    }

    const chatName = [chatCreator, id].sort().join('_')

    const isChat = await chatModel.findOne({ name: chatName, isGroupChat: false })?.populate(commonPopulate);
    if (isChat) {
        return { chat: isChat, isNewChat: false };
    }

    const newChat = await chatModel.create({
        name: chatName,
        participants: [chatCreator, id],
    })

    const detailedChat = await chatModel.findById(newChat._id).populate(commonPopulate);
    return { chat: detailedChat, isNewChat: true };
};