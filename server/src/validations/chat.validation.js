const { body } = require("express-validator")

module.exports.groupChatValidation = [

    // name validation
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

    // participants validation
    body("participants")
        .isArray({ min: 2, max: 50 }).withMessage("Participants must be an array with 2 to 50 users"),

    // each participant should be string (userId)
    body("participants.*")
        .isString().withMessage("Each participant must be a string")
]