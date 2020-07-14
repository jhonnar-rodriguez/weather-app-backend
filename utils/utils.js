const customLogger = require('../config/logger').init('utils');

class Utils {

  /**
   * Check if the given param is null or empty
   *
   * @static
   * @param {*} params
   * @returns bool
   * @memberof Utils
   */
  static isNullOrEmpty(params) {

    try {
      if (Array.isArray(params)) {
        return params.length === 0;
      }

      if (typeof params === 'object') {
        return Object.keys(params).length === 0;
      } else {
        return params === null || params === '' || typeof params === 'undefined';
      }
    } catch (error) {
      customLogger.error(
        `isNullOrEmpty(): Something went wrong applying the validation. Details: ${error}`
      );

      return true;
    }

  };

  /**
   * Check whether the user selected option for the metric system is valid or not.
   *
   * @static
   * @param {*} selected_option
   * @param {*} search_in
   * @returns bool
   * @memberof Utils
   */
  static optionIsValid(selected_option, search_in) {

    try {
      if (search_in.indexOf(selected_option) < 0) {
        return false;
      };

      return true;
    } catch (error) {
      customLogger.error(
        `optionIsValid(): Something went wrong applying the validation. Details: ${error}`
      );

      return false;
    }
  }

  /**
   * Format the weather response applying some convertions according the user selection
   *
   * @static
   * @param {*} weather_response
   * @param {*} metric
   * @returns object
   * @memberof Utils
   */
  static formatResponse(weather_response, metric) {
    let data = [];

    try {
      const dataLength = Object.keys(weather_response).length;
      if (dataLength > 0) {
        let newData = null;
        if (dataLength > 1) {
          for (const weather of weather_response) {
            newData = this.assignVariables(weather);
            data = [
              ...data,
              newData,
            ];
          }
        } else {
          newData = this.assignVariables(weather);
          data = [
            newData,
          ];
        }
      }
    } catch (error) {
      customLogger.error(
        `formatResponse(): Something went formatting the response. Details: ${error}`
      );

    }

    return data;
  }

  /**
 * Capitalize the first letter of the given string
 * 
 * @static
 * @param {*} string
 * @returns string
 * @memberof Utils
 */
  static assignVariables(data, metric) {
    let { name: city, main: { temp }, coord: { lat, lon }, sys: { country }, wind: { speed: windSpeed }, weather } = data;

    if (metric === 'imperial') {
      // convert from Fahrenheit to Celsius
      const fahrenheitConstant = 32;
      temp = parseFloat((temp - fahrenheitConstant) / 1.8, 10).toFixed(2);
    }

    if (metric === 'metric') {
      // Convert from miles per second to miles per hour
      const mailesPerHourConstant = 2.237;
      windSpeed = parseFloat((windSpeed * mailesPerHourConstant), 10).toFixed(2);
    }

    const weatherDescription = this.capitalizeString(weather[0].description);

    return {
      lat,
      lon,
      city,
      temp,
      country,
      windSpeed,
      weatherDescription
    };
  }

  /**
   * Capitalize the first letter of the given string
   * 
   * @static
   * @param {*} string
   * @returns string
   * @memberof Utils
   */
  static capitalizeString(string) {
    let capitalizedString = '';
    const words = string.split(' ');
    let capitalizedWord = '';

    for (const word of words) {
      capitalizedWord = `${word[0].toUpperCase()}${word.slice(1)}`;
      capitalizedString = capitalizedString === '' ? capitalizedWord : `${capitalizedString} ${capitalizedWord}`
    }

    return capitalizedString;
  }

};

module.exports = Utils;
