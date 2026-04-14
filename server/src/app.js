const express = require('express');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet')

const authRoute = require('./routes/auth.route');

const errorHandler = require('./middlewares/error.middleware');
const corsMiddleware = require('./config/cors.config');
const sanitizeMiddleware = require("./middlewares/sanitize.middleware");
const { swaggerSpec } = require('./config/swagger.config')

const app = express()

// CORS configuration
app.use(corsMiddleware);

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet())
app.use(sanitizeMiddleware);

// Routes
app.use('/api/v1/auth', authRoute);


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

module.exports = app; 