'use strict';
/**
 * set the passport facebook strategy.
 * ### Usage:
 *```
 * import passport from 'passport'
 * import google from './modules/passport/google.js';
 * google(passport);
 * ```
 * @author Moaaz Nashawi
 * 
 * @module Passport GoogleStrategy
 */


import dotenv from 'dotenv'; dotenv.config();
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'


/**
 * set the passport google strategy.
 * @param {Object} passport 
 * @param {String} clientID 
 * @param {String} clientSecret 
 * @param {String} callbackURL 
 */
const setGoogleStrategyPassport = (passport, clientID, clientSecret, callbackURL) => {

    passport.use(new GoogleStrategy({
        clientID,
        clientSecret,
        callbackURL
    },
        function (token, tokenSecret, profile, done) {

            return done(null, profile);

        }
    ));


}

export default setGoogleStrategyPassport;

