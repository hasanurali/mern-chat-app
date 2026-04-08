const rateLimit = require('express-rate-limit')


module.exports.registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: "Too many accounts created, try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts, try again later",
    standardHeaders: true,
    legacyHeaders: false,
});