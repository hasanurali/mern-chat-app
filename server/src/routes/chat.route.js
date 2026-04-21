const express = require('express')
const chatRoute = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const { createOneToOneChat, createGroupChat, fetchChats, fetchChat, joinGroupChat, leaveGroupChat, changeGroupName } = require('../controllers/chat.controller');
const { groupChatValidation, changeGroupNameValidation } = require('../validations/chat.validation');
const validate = require('../middlewares/validation.result.middleware');


chatRoute.post('/one/:id',
    authMiddleware,
    createOneToOneChat
);

chatRoute.post('/group',
    authMiddleware,
    groupChatValidation,
    validate,
    createGroupChat
);

chatRoute.get('/',
    authMiddleware,
    fetchChats
);

chatRoute.get('/:id',
    authMiddleware,
    fetchChat
);

chatRoute.post('/join/:id',
    authMiddleware,
    joinGroupChat
);

chatRoute.post('/leave/:id',
    authMiddleware,
    leaveGroupChat
);

chatRoute.put('/change/:id',
    authMiddleware,
    changeGroupNameValidation,
    validate,
    changeGroupName
);

module.exports = chatRoute;