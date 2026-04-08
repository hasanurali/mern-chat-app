const express = require('express');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

const authRoute = require('./routes/auth.route');

const errorHandler = require('./middlewares/error.middleware');
const corsMiddleware = require('./config/cors.config');

const app = express()

// CORS configuration
app.use(corsMiddleware);

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());

// Routes
app.use('/api/v1/auth', authRoute);


app.use(errorHandler);

module.exports = app; 