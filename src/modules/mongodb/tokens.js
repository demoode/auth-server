'use strict';

/**
 * contain all the mongodb operations of User Object
 * ### Usage:
 *```
 * import Tokens from '../mongodb/tokens.js';
 * ```
 * **Or:**<br />
 * ```
 * import { addToken, removeByToken, checkTokenValidity } from '../mongodb/tokens.js';
 * 
 * ```
 * @author Moaaz Nashawi
 * 
 * @module MongoDb TokensOperations
 */

import mongoose from 'mongoose';

/**
 * mongoose token model
 * @type {object} 
 */
let TokensModel;
/**
 * mongoose token model
 * @type {object} 
 */
let tokensSchema;


/**
 * module initializer to set the token model & schema 
 * @method
 */
const setDBSchema = () => {

    tokensSchema = new mongoose.Schema({
        userId: String,
        token: String,
        expiry: Date,
        valid: Boolean
    });
    TokensModel = mongoose.model('tokens', tokensSchema);


}
/**
 * add token to the mongodb
 * @method
 * @param {String} userId 
 * @param {String} token 
 * @param {Date} expiry 
 * @param {Boolean} valid 
 * 
 * @returns {Promise} Promise.resolve(token) the created token object
 * @returns {Promise} Promise.reject(err) on error
 *  
 */
export const addToken = (userId, token, expiry, valid) => {


    const tkn = new TokensModel({ userId, token, expiry, valid });


    return new Promise((res, rej) => {
        tkn.save(function (err, token) {
            if (err) rej(err);

            res(token);


        });

    })



}

export const checkTokenValidity = (token) => {

    return new Promise((resolve, reject) => {


        TokensModel.findOne({
            token,
            valid: true,
            expiry: {
                $gte: Date.now()
            }
        }, (err, docs) => {

            if (err) reject(err);

            if (docs) resolve(docs)

            reject(reject({ message: "token is not valid ", code: 403 }))
        })
    })


}

export const removeByToken = (token) => {

    return new Promise((resolve, reject) => {
        TokensModel.findOneAndDelete({ token }, (err, doc) => {

            if (err) reject({ message: "server under maintenances", code: 500 })
            resolve()
        })

    })



}
export default setDBSchema();