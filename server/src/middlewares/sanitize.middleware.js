const mongoSanitize = require("express-mongo-sanitize");

const sanitizeMiddleware = (req, res, next) => {
 
  req.body = mongoSanitize.sanitize(req.body || {});
  req.params = mongoSanitize.sanitize(req.params || {});

  req.cleanQuery = mongoSanitize.sanitize({ ...(req.query || {}) });

  next();
};

module.exports = sanitizeMiddleware;