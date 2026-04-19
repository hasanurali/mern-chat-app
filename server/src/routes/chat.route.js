const express = require('express')
const chatRoute = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const { createOneToOneChat } = require('../controllers/chat.controller')


chatRoute.post('/one/:id',
    authMiddleware,
    createOneToOneChat
);

module.exports = chatRoute;