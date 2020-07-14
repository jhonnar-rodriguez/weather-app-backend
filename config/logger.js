const log4js = require('log4js');

class CustomLogger {
  static init(invoking_file = 'index.js') {
    log4js.configure({
      appenders: { weather_app: { type: "file", filename: "logs/weather_app.log" } },
      categories: { default: { appenders: ["weather_app"], level: "error" } }
    });
    const logger = log4js.getLogger(invoking_file);
    logger.level = 'all';

    return logger;
  }
}

module.exports = CustomLogger;
