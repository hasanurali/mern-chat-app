const express = require('express')
const chatRoute = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const { createOneToOneChat, createGroupChat, fetchChats, fetchChat, joinGroupChat, leaveGroupChat, changeGroupName, deleteChat } = require('../controllers/chat.controller');
const { groupChatValidation, changeGroupNameValidation } = require('../validations/chat.validation');
const validate = require('../middlewares/validation.result.middleware');


/**
 * @swagger
 * /chat/one/{id}:
 *   post:
 *     summary: Create one-to-one chat
 *     tags: [Chat]
 *     description: Creates or retrieves a one-to-one chat with another user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to chat with
 *     responses:
 *       201:
 *         description: One-to-one chat created or retrieved
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Chat created
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
chatRoute.post('/one/:id',
    authMiddleware,
    createOneToOneChat
);

/**
 * @swagger
 * /chat/group:
 *   post:
 *     summary: Create group chat
 *     tags: [Chat]
 *     description: Creates a new group chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - members
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Project Discussion"
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["userId1", "userId2", "userId3"]
 *     responses:
 *       201:
 *         description: Group chat created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Group created
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
chatRoute.post('/group',
    authMiddleware,
    groupChatValidation,
    validate,
    createGroupChat
);

/**
 * @swagger
 * /chat:
 *   get:
 *     summary: Fetch all chats
 *     tags: [Chat]
 *     description: Retrieves all chats for the logged-in user
 *     responses:
 *       200:
 *         description: Chats fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Chats fetched
 *       401:
 *         description: Unauthorized
 */
chatRoute.get('/',
    authMiddleware,
    fetchChats
);

/**
 * @swagger
 * /chat/{id}:
 *   get:
 *     summary: Fetch specific chat
 *     tags: [Chat]
 *     description: Retrieves details of a specific chat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Chat fetched
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Chat fetched
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chat not found
 */
chatRoute.get('/:id',
    authMiddleware,
    fetchChat
);

/**
 * @swagger
 * /chat/join/{id}:
 *   post:
 *     summary: Join group chat
 *     tags: [Chat]
 *     description: Join an existing group chat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group chat ID
 *     responses:
 *       200:
 *         description: Joined group chat successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User joined group
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Group chat not found
 */
chatRoute.post('/join/:id',
    authMiddleware,
    joinGroupChat
);

/**
 * @swagger
 * /chat/leave/{id}:
 *   post:
 *     summary: Leave group chat
 *     tags: [Chat]
 *     description: Leave an existing group chat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group chat ID
 *     responses:
 *       200:
 *         description: Left group chat successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User left group
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Group chat not found
 */
chatRoute.post('/leave/:id',
    authMiddleware,
    leaveGroupChat
);

/**
 * @swagger
 * /chat/name/{id}:
 *   put:
 *     summary: Change group name
 *     tags: [Chat]
 *     description: Update the name of a group chat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group chat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Group Name"
 *     responses:
 *       200:
 *         description: Group name updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Group name updated
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Group chat not found
 */
chatRoute.put('/name/:id',
    authMiddleware,
    changeGroupNameValidation,
    validate,
    changeGroupName
);

/**
 * @swagger
 * /chat/{id}:
 *   delete:
 *     summary: Delete chat
 *     tags: [Chat]
 *     description: Delete a chat (one-to-one or group)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Chat deleted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Chat deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chat not found
 */
chatRoute.delete('/:id',
    authMiddleware,
    deleteChat
);

module.exports = chatRoute;