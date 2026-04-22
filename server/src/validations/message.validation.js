const { body } = require("express-validator")

module.exports.createMessageValidation = [

    // message validation
    body("message")
        .notEmpty().withMessage("message is required")
        .isLength({ min: 1 }).withMessage("message must be at least 1 characters"),
]