require('dotenv').config();
const { Utils, HttpClient } = require('../../utils');
const customLogger = require('../../config/logger').init('weather.controller');
const WEATHER_APP_URL = process.env.WEATHER_APP_URL || '';
const WEATHER_APP_ID = process.env.WEATHER_APP_ID || '';

class WeatherController {

  constructor() {}

  /**
   * Handle the get weather request applying some validations and consuming the http get method
   * from the utils file
   *
   * @static
   * @param {*} req
   * @param {*} resp
   * @returns
   * @memberof WeatherController
   */
  static async getWeather(req, resp) {
    try {
      const { body: { city, metric } } = req;
      const emptyMessage = 'Fields cannot be empty, please validate';

      if (Utils.isNullOrEmpty(city)) {
        return resp.status(400).json({
          success: false,
          message: emptyMessage,
        });
      };

      if (Utils.isNullOrEmpty(metric)) {
        return resp.status(400).json({
          success: false,
          message: emptyMessage,
        });
      };

      if (Utils.optionIsValid(metric, ['imperial', 'metric']) === false) {
        return resp.status(400).json({
          success: false,
          message: 'Invalid metric selected, please try again!',
        });
      };

      // Get the results;
      const url = `${WEATHER_APP_URL}/data/2.5/find?q=${city}&units=${metric}&mode=json&appid=${WEATHER_APP_ID}&cnt=2`;
      let data = {};

      await HttpClient
        .get(url)
        .then((weatherResp) => {
          data = Utils.formatResponse(weatherResp, metric);
        });

      return resp.status(200).json({
        success: true,
        message: 'Weather done',
        data,
      });
    } catch (error) {
      customLogger.error(
        `getWeather(): Something went wrong getting the weather. Details: ${error}`
      );

      return resp.status(500).json({
        success: false,
        message: 'Somethind went wrong getting the weather.',
        code: '001',
      });
    }
  }
}

module.exports = WeatherController;
