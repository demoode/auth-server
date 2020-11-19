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
 * @module Express HttpsServer
 */
'use strict';
import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs';
import https from 'https';

/**
 * set & run the https server.
 * @method
 * @param {Object} app Express app
 * @param {Number} port port number
 * @param {String} serverKey the https server private key
 * @param {String} serverCert the https server certificate
 */
export const runHttpsServer = (app, port, serverKey, serverCert) => {

    const privateKey = fs.readFileSync(serverKey, 'utf8');
    const certificate = fs.readFileSync(serverCert, 'utf8');
    const credentials = {
        key: privateKey,
        cert: certificate,
    };
    const httpsServer = https.createServer(credentials, app);



    httpsServer.listen(port);



}



