require('dotenv').config();
const TOKEN = process.env.TOKEN || '';
const logger = require('../config/logger');
const customLogger = logger.init('authorization.middleware');

/**
 * Check if the request is valid or not using a shared token in the Authentication header
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 * @returns
 */
module.exports.checkAuthorization = function (req, resp, next) {
    try {
        var token = req.headers.authorization;

        if (!token || token !== TOKEN) {
            return resp.status(401).json({
                success: false,
                message: 'Unauthorized request!!',
            });
        }

        next();
    } catch (error) {
        customLogger.error(
            `checkAuthorization(): Something checking the authorization token. Details: ${error}`
        );

        return resp.status(401).json({
            success: false,
            message: 'Unauthorized request!!',
        });
    }
}