const mongoose = require('mongoose')
const log = require('../utils/logger')

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        log('Mongo db connected')
    } catch (err) {
        console.error('DB connection failed:', err.message)
        process.exit(1)
    }
}

module.exports = connectToDb;