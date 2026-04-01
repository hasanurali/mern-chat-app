const express = require('express')
const authRoute = express.Router()
const { registerUser, loginUser, getCurrentUser, logoutUser, refreshToken } = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const { registerValidation, loginValidation } = require('../validations/auth.validation')
const validate = require('../middlewares/validation.result.middleware')


/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     description: Creates a new user account with email and password authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hasan
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: "Password@123"
 *     responses:
 *       201:
 *         description: User created
 */
authRoute.post('/register',
    registerValidation,
    validate,
    registerUser
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     description: Authenticate user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: "Password@123"
 *     responses:
 *       200:
 *         description: User logged in
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User logged in
 *       401:
 *         description: Invalid credentials
 */
authRoute.post('/login',
    loginValidation,
    validate,
    loginUser
);

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     description: Get logged-in user details
 *     responses:
 *       200:
 *         description: User fetched
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User fetched
 *       401:
 *         description: Unauthorized
 */
authRoute.get('/me',
    authMiddleware,
    getCurrentUser
);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     description: Logout user and clear cookies
 *     responses:
 *       200:
 *         description: User logged out
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User logged out
 *       401:
 *         description: Unauthorized
 */
authRoute.post('/logout',
    authMiddleware,
    logoutUser
);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     description: Generate new access token using refresh token
 *     responses:
 *       200:
 *         description: Token refreshed
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Token refreshed
 *       401:
 *         description: Invalid or missing refresh token
 */
authRoute.post('/refresh',
    refreshToken
);


module.exports = authRoute;