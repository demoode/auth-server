/**
 * express middleware to banned all the server operations there are connection errors like disconnecting from the db
 * ### Usage:
 *```
 * import express from 'express';
 * let app = express();
 * import { serverOnMiddleWear } from './modules/configurations/custom-middleware.js'
 * app.use(serverOnMiddleWear)
 * 
 * ```
 * @author Moaaz Nashawi
 * 
 * @module Express IsServerOnMiddleware
 */

import { isServerOn } from './server-status.js'

/**
 * check if the server is on or disconnected 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns next if server is online
 * @returns stop route execution and output object with  code 500 and message
 */
export const serverOnMiddleWear = (req, res, next) => {

    isServerOn()
        .then(() => next())
        .catch(err => res.status(err.code).json({ message: err.message }))

}