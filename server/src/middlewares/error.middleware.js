const log = require('../utils/logger')

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500
    let message = err.message || "Internal Server Error"

    log(` [ERROR]
       Message: ${message}
       Status: ${statusCode}
       Route: ${req.method} ${req.originalUrl}
       Time: ${new Date().toISOString()}
       Stack: ${err.stack} `)

    res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || []
    })
}

module.exports = errorHandler;