require('dotenv').config()
const app = require('./src/app')
const { PORT } = require('./src/constant')
const connectToDb = require('./src/config/db.config')
const log = require('./src/utils/logger');
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


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
        url: "http://localhost:2000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

(async () => {
    try {
        await connectToDb();
        app.listen(PORT, () => {
            log(`Server runs on http://localhost:${PORT}`)
        })

    } catch (err) {
        console.error("Server failed to start:", err.message)
        process.exit(1)
    }
})()



