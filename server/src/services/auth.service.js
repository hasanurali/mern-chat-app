const userModel = require('../models/user.model')
const { HTTP_STATUS } = require('../constant/index')
const ApiError = require('../utils/apiError')
const jwt = require('jsonwebtoken')
const JWT_CONFIG = require('../config/jwt.config')


module.exports.register = async (data) => {

    const { email } = data;

    const isUserExist = await userModel.exists({ email })
    if (isUserExist) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "User already exist")
    }

    const user = await userModel.create(data);

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    await user.setRefreshToken(refreshToken);
    await user.save();

    return { user, accessToken, refreshToken }
};

module.exports.login = async (data) => {

    const { email, password } = data;

    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not exist")
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials")
    }

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    await user.setRefreshToken(refreshToken);
    await user.save();

    return { user, accessToken, refreshToken }
};

module.exports.logout = async (data) => {

    const { _id } = data;

    await userModel.findByIdAndUpdate(_id, { refreshToken: null })
};

module.exports.refreshToken = async (token) => {

    if (!token) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "No token provided");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, JWT_CONFIG.REFRESH.SECRET)
    } catch (error) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid or expired token");
    }

    const user = await userModel.findById(decoded.id).select("+refreshToken");
    if (!user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "User not found");
    }

    const isValid = await user.compareRefreshToken(token)
    if (!isValid) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid refresh token");
    }

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    await user.setRefreshToken(refreshToken);
    await user.save();

    return { accessToken, refreshToken }
};

