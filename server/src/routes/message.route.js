const express = require('express')
const messageRoute = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const { createMessage } = require('../controllers/message.controller');
const { createMessageValidation } = require('../validations/message.validation');
const validate = require('../middlewares/validation.result.middleware');


messageRoute.post('/:id',
    authMiddleware,
    createMessageValidation,
    validate,
    createMessage
);


module.exports = messageRoute;