/**
 * contain all the JWT generation methods
 * ### Usage:
 *```
 * import { generateRefreshToken, generateAccessToken, verifyAccessToken, verifyRefreshToken } from '../configurations/jwt-generator.js'
 * ```
 * @author Moaaz Nashawi
 * 
 * @module Tools JWTGenerator
 */

'use strict';

//import jwtt from "jsonwebtoken";
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

/**
 * 
 * generate token
 * @method
 * @param {String} userId 
 * @param {String} refreshTokenSecret 
 * @returns {String} refresh token
 */
export const generateToken = (userId, tokenSecret) => {
    return sign({ sub: userId }, tokenSecret);
}

/**
 * verify if the token is valid or not or expired
 * @method
 * @param {String} token 
 * @param {String} accessTokenSecret 
 * @returns {Promise} Promise.resolve(decodedToken) return the decoded token object
 * @returns {Promise} Promise.reject({ message: "token is expired", code: 410 }) if the token is expired
 * @returns {Promise} Promise.reject({ message: "token is not valid", code: 400 }) if the token is not valid
 */
export const verifyToken = (token, tokenSecret) => {

    return new Promise((resolve, reject) => {
        verify(token, tokenSecret, function (err, decoded) {
            if (decoded != undefined) resolve(decoded);

            if (err.message == "jwt expired") reject({ message: "token is expired", code: 410 })

            reject({ message: "token is not valid", code: 400 })


        });
    })

}



export default () => { };
