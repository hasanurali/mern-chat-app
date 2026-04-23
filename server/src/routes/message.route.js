const express = require('express')
const messageRoute = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const { createMessage, fetchMessages, updateMessageStatus, deleteMessage } = require('../controllers/message.controller');
const { createMessageValidation } = require('../validations/message.validation');
const validate = require('../middlewares/validation.result.middleware');


/**
 * @swagger
 * /message/{id}:
 *   post:
 *     summary: Create message
 *     tags: [Message]
 *     description: Send a new message in a chat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Message created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Message sent
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chat not found
 */
messageRoute.post('/:id',
    authMiddleware,
    createMessageValidation,
    validate,
    createMessage
);

/**
 * @swagger
 * /message/{id}:
 *   get:
 *     summary: Fetch messages
 *     tags: [Message]
 *     description: Retrieve all messages from a chat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Messages fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Messages fetched
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chat not found
 */
messageRoute.get('/:id',
    authMiddleware,
    fetchMessages
);

/**
 * @swagger
 * /message/{id}:
 *   put:
 *     summary: Update message status
 *     tags: [Message]
 *     description: Update the read status of a message
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["sent", "delivered", "read"]
 *                 example: "read"
 *     responses:
 *       200:
 *         description: Message status updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Message status updated
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Message not found
 */
messageRoute.put('/:id',
    authMiddleware,
    updateMessageStatus
);

/**
 * @swagger
 * /message/{id}:
 *   delete:
 *     summary: Delete message
 *     tags: [Message]
 *     description: Delete a message from a chat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message deleted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Message deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Message not found
 */
messageRoute.delete('/:id',
    authMiddleware,
    deleteMessage
);


module.exports = messageRoute;