const { validationResult } = require('express-validator')
const { HTTP_STATUS } = require('../constant/index')
const apiError = require('../utils/apiError')


const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new apiError(HTTP_STATUS.BAD_REQUEST, "Validation failed", errors.array())
    }

    next()
}


module.exports = validate;