const express = require('express')
const chatRoute = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const { createOneToOneChat, createGroupChat, fetchChats, fetchChat } = require('../controllers/chat.controller');
const { groupChatValidation } = require('../validations/chat.validation');
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

module.exports = chatRoute;