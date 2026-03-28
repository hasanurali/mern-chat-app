const express = require('express');
const errorHandler = require('./middlewares/error.middleware');
const asyncHandler = require('./utils/asyncHandler') 
const app = express()



app.use(errorHandler)

module.exports = app;