// Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialization
const server = express();

// CORS
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization', 'Accept']
};

server.use(cors(corsOptions));

/**
 * Body Parser configuration
 * parse application/x-www-form-urlencoded
 * parse application/json
 * **/
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Application Routes
const { main: mainRoutes, weather: weatherRoutes } = require('../routes');

server.use('/api/weather', weatherRoutes);
server.use('/api/', mainRoutes);

module.exports = server;