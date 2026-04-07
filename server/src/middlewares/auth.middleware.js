const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const { HTTP_STATUS } = require('../constant/index');
const ApiError = require('../utils/apiError');
const JWT_CONFIG = require('../config/jwt.config');

const authMiddleware = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization;

    const token = req.cookies.accessToken || (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null);

    if (!token) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "No token provided");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, JWT_CONFIG.ACCESS.SECRET);
    } catch (err) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid or expired token");
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "User not found");
    }

    req.user = user;
    next();
});

module.exports = authMiddleware;