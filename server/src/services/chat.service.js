const userModel = require('../models/user.model')
const chatModel = require('../models/chat.model')
const { HTTP_STATUS } = require('../constant/index')
const ApiError = require('../utils/apiError')
const mongoose = require('mongoose')


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

    const isChat = await chatModel.findOne({ name: chatName, isGroupChat: false }).populate(commonPopulate);
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

module.exports.createGroupChat = async (data) => {

    const { name, participants, chatAdmin } = data;


    const isDuplicate = new Set(participants.map(id => id.toString())).size !== participants.length;
    if (isDuplicate) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Group contains Duplicate users");
    }

    const users = await userModel.find({
        _id: { $in: participants }
    });

    if (users.length !== participants.length) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Group contains invalid users");
    };

    const newGroupChat = await chatModel.create({
        name,
        isGroupChat: true,
        participants: [chatAdmin, ...participants],
        admin: chatAdmin
    })

    const detailedChat = await chatModel.findById(newGroupChat._id).populate(commonPopulate);
    return detailedChat;
};

module.exports.fetchChats = async (id) => {

    const chats = await chatModel.find({ participants: id }).populate(commonPopulate);
    return chats;
};

module.exports.fetchChat = async (data) => {

    const { userId, chatId } = data;

    if (!chatId) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Group id is required");
    };

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid chat id");
    };

    const isChat = await chatModel.findOne({ _id: chatId, participants: userId }).populate(commonPopulate);
    if (!isChat) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Chat not found");
    };

    return isChat;
};

module.exports.joinGroupChat = async (data) => {

    const { userId, chatId } = data;

    if (!chatId) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Group id is required");
    };

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid chat id");
    };

    const isChat = await chatModel.findOne({ _id: chatId, isGroupChat: true });
    if (!isChat) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Group not found");
    };

    const isAlreadyMember = isChat.participants.some(id => id.toString() === userId.toString());
    if (isAlreadyMember) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "User is already a member of this group");
    };

    if (isChat.participants.length === 50) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Group is full. Maximum 50 members allowed");
    };

    const detailedChat = await chatModel.findByIdAndUpdate(chatId, { $push: { participants: userId } }, { returnDocument: "after" }).populate(commonPopulate);
    return detailedChat;
};