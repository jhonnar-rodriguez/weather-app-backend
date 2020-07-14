const unirest = require('unirest');
const customLogger = require('../config/logger').init('http');

class HttpClient {

  /**
   * Fires the get request to the given url and check if the response is valid or not
   *
   * @static
   * @param {*} url
   * @returns object
   * @memberof HttpClient
   */
  static async get(url) {
    try {
      let data = {};

      await unirest
        .get(url)
        .then((weatherResp) => {
          const responseCode = parseInt(weatherResp.body.cod);
          if (responseCode === 200) {
            data = weatherResp.body.list;
          } else {
            customLogger.error(
              `get(): Something went wrong with the request. Details: ${weatherResp.body.message || 'Undefined'}`
            );
          }
        })
        .catch((error) => {
          throw new Error(error);
        })

      return data;
    } catch (error) {
      customLogger.error(
        `get(): Something went wrong with the request. Details: ${error}`
      );

      throw new Error({
        success: false,
        message: 'Somethind went wrong getting the weather.',
        code: '001',
      });
    }
  }
}

module.exports = HttpClient;

