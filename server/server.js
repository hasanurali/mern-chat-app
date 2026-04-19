require('dotenv').config()
const { server } = require('./src/socket/socket')
const connectToDb = require('./src/config/db.config')
const log = require('./src/utils/logger');

const PORT = process.env.PORT || 2000;

(async () => {
  try {
    await connectToDb();
    server.listen(PORT, () => {
      log(`Server runs on http://localhost:${PORT}`)
    })

  } catch (err) {
    console.error("Server failed to start:", err.message)
    process.exit(1)
  }
})()