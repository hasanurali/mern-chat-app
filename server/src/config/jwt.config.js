const JWT_CONFIG = {
  ACCESS: {
    SECRET: process.env.JWT_ACCESS_KEY,
    EXPIRY: "15m"
  },

  REFRESH: {
    SECRET: process.env.JWT_REFRESH_KEY,
    EXPIRY: "7d"
  }
}

module.exports = JWT_CONFIG;