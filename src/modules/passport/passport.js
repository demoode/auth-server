/**
 * set the passport configurations.
 * ### Usage:
 *```
 * import passport from 'passport'
 * import passConfig from './modules/passport/passport.js'
 * passConfig(passport);
 * ```
 * @author Moaaz Nashawi
 * 
 * @module Passport Configurations
 */

/**
 * 
 * @param {Object} passport set passport configurations 
 */
const setPassportConfigs = (passport) => {


    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });

    return passport
}

export default setPassportConfigs;