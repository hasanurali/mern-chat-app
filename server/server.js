require('dotenv').config()
const app = require('./src/app')
const { PORT } = require('./src/constant')
const connectToDb = require('./src/config/db')
const log = require('./src/utils/logger');

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

