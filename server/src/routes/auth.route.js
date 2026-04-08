const express = require('express')
const authRoute = express.Router()
const { registerUser, loginUser, getCurrentUser, logoutUser, refreshToken } = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const { registerValidation, loginValidation } = require('../validations/auth.validation')
const validate = require('../middlewares/validation.result.middleware')
const { registerLimiter, loginLimiter } = require('../middlewares/ratelimit.middleware')


authRoute.post('/register',
    registerLimiter,
    registerValidation,
    validate,
    registerUser
);

authRoute.post('/login',
    loginLimiter,
    loginValidation,
    validate,
    loginUser
);

authRoute.get('/me',
    authMiddleware,
    getCurrentUser
);

authRoute.post('/logout',
    authMiddleware,
    logoutUser
);

authRoute.post('/refresh',
    refreshToken
);


module.exports = authRoute;