const express = require('express');
const cookieParser = require('cookie-parser')

const authRoute = require('./routes/auth.route')

const errorHandler = require('./middlewares/error.middleware');

const app = express()

// middlewares
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/v1/auth', authRoute)


app.use(errorHandler)

module.exports = app;
