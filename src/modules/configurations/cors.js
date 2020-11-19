'use strict';
/**
 * set the cors strategy.
 * ### Usage:
 *```
 * import express from 'express';
 * import cors from 'cors';
 * import { corsOptions } from './modules/configurations/cors.js';
 * let app = express();
 * app.use(cors(corsOptions))
 * 
 * ```
 * @author Moaaz Nashawi
 * 
 * @module Express CorsConfigurations
 */

import dotenv from 'dotenv'; dotenv.config();

/**
 * the allowed cors url list 
 * @type {String[]} 
 */
let allowedUrlList11 = [];
/**
 * set the cors options of allowed url list
 * @method
 * @param {Object} req 
 * @param {Method} callback 
 */
const corsOptions = function (req, callback) {
    let corsOptions;

    if (allowedUrlList11.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    corsOptions = { ...corsOptions }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

export default (allowedUrlList) => {
    //console.log("hello")
    //this.allowedUrlList = allowedUrlList;
    allowedUrlList11 = allowedUrlList;
    return corsOptions;
}