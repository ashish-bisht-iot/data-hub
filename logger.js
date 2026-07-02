// middleware/logger.js
// Custom middleware -> logs HTTP method, path, and timestamp for every request

function requestLogger(req, res, next) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${req.method}] ${req.originalUrl} - ${timestamp}`);
  next();
}

module.exports = requestLogger;
