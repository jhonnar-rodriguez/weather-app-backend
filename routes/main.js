const express = require('express');
const app = express();

app.get('/', (req, resp) => {
    resp.status(200).json({
        success: true,
        message: 'The application is up and running!!'
    });
});

module.exports = app;