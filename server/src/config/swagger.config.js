const swaggerJsDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 2000

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MERN Chat API",
            version: "1.0.0",
            description: "API documentation for MERN Chat App",
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api/v1`,
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

module.exports.swaggerSpec = swaggerJsDoc(options);
