const express = require('express');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const swaggerUi = require("swagger-ui-express");

const authRoute = require('./routes/auth.route');

const errorHandler = require('./middlewares/error.middleware');
const corsMiddleware = require('./config/cors.config');
const { swaggerSpec } = require('./config/swagger.config')

const app = express()

// CORS configuration
app.use(corsMiddleware);

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/api/docs")) {
        return next();
    }
    mongoSanitize()(req, res, next);
});

// Routes
app.use('/api/v1/auth', authRoute);


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

module.exports = app; 