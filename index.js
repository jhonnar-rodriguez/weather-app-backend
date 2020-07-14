require('dotenv').config();
const logger = require('./config/logger');
const server = require('./config/server');

const customLogger = logger.init();

// Listen
const APP_PORT = process.env.APP_PORT || 3300;

server.listen(APP_PORT, () => {
  const runningMessage = `Server running on port ${APP_PORT} ...`;

  console.log(runningMessage);
  customLogger.info(runningMessage);
});