const express = require('express');

const authRoute = require('./routes/auth.route')

const errorHandler = require('./middlewares/error.middleware');

const app = express()


// Routes
app.use('/api/v1/auth', authRoute)


app.use(errorHandler)

module.exports = app; 