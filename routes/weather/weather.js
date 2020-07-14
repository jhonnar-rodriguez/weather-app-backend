
const express = require('express');

// Middlewares
const authorization = require('../../middlewares/authorization.middleware');

// App
const app = express();
const WeatherController = require('../../controllers/weather/weather.controller');

/**
 * Get weather route. Returns the weather for the given params
 * Before running the request the checkAuthorization middleware will be fired.
 */
app.post('/', [authorization.checkAuthorization], WeatherController.getWeather);

module.exports = app;
