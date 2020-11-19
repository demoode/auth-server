'use strict';
import dotenv from 'dotenv'; dotenv.config();
import FacebookStrategy from 'passport-facebook';
/**
 * set the passport facebook strategy.
 * ### Usage:
 *```
 * import passport from 'passport'
 * import facebook from './modules/passport/facebook.js';
 * facebook(passport);
 * ```
 * @author Moaaz Nashawi
 * 
 * @module Passport FacebookStrategy
 */


/**
 * set the passport facebook strategy.
 * @param {Object} passport 
 * @param {String} clientID 
 * @param {String} clientSecret 
 * @param {String} callbackURL 
 */
export const setFacebookStrategyPassport = (passport, clientID, clientSecret, callbackURL) => {

    let FacebookStrategy1 = FacebookStrategy.Strategy;
    passport.use(new FacebookStrategy({
        clientID,
        clientSecret,
        callbackURL
    },
        function (accessToken, refreshToken, profile, cb) {

            return cb(null, profile);
        }
    ));


}


export default setFacebookStrategyPassport;