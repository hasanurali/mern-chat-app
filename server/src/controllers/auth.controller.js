const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/apiResponse')
const { HTTP_STATUS } = require('../constant/index')
const authService = require('../services/auth.service ')
const COOKIE_CONFIGURATION = require('../config/cookie.config')

module.exports.registerUser = asyncHandler(async (req, res) => {

    const { user, accessToken, refreshToken } = await authService.register(req.body);

    return res.status(HTTP_STATUS.CREATED)
        .cookie('refreshToken', refreshToken, COOKIE_CONFIGURATION.REFRESH)
        .cookie('accessToken', accessToken, COOKIE_CONFIGURATION.ACCESS)
        .json(new ApiResponse(HTTP_STATUS.CREATED, "User created", user));
});

module.exports.loginUser = asyncHandler(async (req, res) => {

    const { user, accessToken, refreshToken } = await authService.login(req.body);

    return res.status(HTTP_STATUS.OK)
        .cookie('refreshToken', refreshToken, COOKIE_CONFIGURATION.REFRESH)
        .cookie('accessToken', accessToken, COOKIE_CONFIGURATION.ACCESS)
        .json(new ApiResponse(HTTP_STATUS.OK, "User logged in", user));
});

module.exports.getCurrentUser = (req, res) => {

    const user = req.user;

    return res.status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, "User fetched", user));
};

module.exports.logoutUser = asyncHandler(async (req, res) => {

    const user = req.user;

    await authService.logout(user)

    return res.status(HTTP_STATUS.OK)
        .clearCookie('refreshToken', COOKIE_CONFIGURATION.REFRESH)
        .clearCookie('accessToken', COOKIE_CONFIGURATION.ACCESS)
        .json(new ApiResponse(HTTP_STATUS.OK, "User logged out"));
});

module.exports.refreshToken = asyncHandler(async (req, res) => {

    const token = req.cookies.refreshToken;

    const tokens = await authService.refreshToken(token);

    return res.status(HTTP_STATUS.OK)
        .cookie('refreshToken', tokens.refreshToken, COOKIE_CONFIGURATION.REFRESH)
        .cookie('accessToken', tokens.accessToken, COOKIE_CONFIGURATION.ACCESS)
        .json(new ApiResponse(HTTP_STATUS.OK, "Token refreshed"));
});