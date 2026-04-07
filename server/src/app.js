const express = require('express');

const errorHandler = require('./middlewares/error.middleware');

const app = express()


app.use(errorHandler)

module.exports = app; 