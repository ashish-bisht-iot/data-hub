function requestLogger(req, res, next) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${req.method}] ${req.originalUrl} - ${timestamp}`);
  next();
}

module.exports = requestLogger;