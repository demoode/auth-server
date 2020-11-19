'use strict';

/**
 * contain all the mongodb operations of User Object
 * ### Usage:
 *```
 * import Users from '../mongodb/users.js';
 * ```
 * **Or:**<br />
 * ```
 * import { checkIfUserExists, addUser, login, checkIfUserActive } from '../mongodb/users.js';
 * ```
 * @author Moaaz Nashawi
 * 
 * @module MongoDb UserOperations
 */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

/**
 * the bcrypt salt rounds value
 * @type {Number}
 */
const saltRounds = 10;

/**
 * mongoose user model
 * @type {object} 
 */
let UsersModel;

/**
 * mongoose user schema
 * @type {object} 
 */
let userSchema;


/**
 * module initializer to set the user model & schema 
 * @method
 */
const setDBSchema = () => {
    //console.log("set db")
    userSchema = new mongoose.Schema({
        userName: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: String,
        displayName: String,
        active: Boolean,
        date: Date,
        provider: String,
        userId: { type: String, unique: true, required: true }
    });
    UsersModel = mongoose.model('users', userSchema);


}
/**
 * add user to the database
 * @method
 * @param {Object} user the user object {userName:"",emails:""...etc}
 * @returns {Promise} Promise.resolve(user) the created token object
 * @returns {Promise} Promise.reject(err) on error return reject with code 500
 * */
export const addUser = (user) => {
    return new Promise((resolve, reject) => {


        bcrypt.hash(user.password, saltRounds, function (err, hash) {
            user = { ...user, password: hash }
            const tkn = new UsersModel(user);
            tkn.save(function (err, doc) {

                if (err) reject({ message: "server under maintenances", code: 500 })

                resolve(doc);

            });
        });

    })
}
/**
 * check if the user status is active or banned in the db
 * @method
 * 
 *@param {String} userId the user provider
 * 
 * @returns {Promise} Promise.resolve(user) the inserted user object on success
 * @returns {Promise}  Promise.reject() on general error return code 500 and message
 * @returns {Promise}  Promise.reject() if the user is banned return code 403 and message
 * */
export const checkIfUserActive = (userId) => {

    return new Promise((resolve, reject) => {


        UsersModel.findOne({
            userId,
            active: true,
        }, (err, user) => {

            if (err) reject(err);

            if (user) return resolve(user);

            return reject({ code: 403, message: "user is banned" });

        });

    })
}

/**
 * check if the user exist in db
 * @method
 * 
 *@param {String} userId the user provider
 * 
 * @returns {Promise} Promise.resolve(user) the user object if exist or false if the user is null
 * @returns {Promise} Promise.reject() on general error or if the user is not exist
 * */
export const checkIfUserExists = (user) => {

    return new Promise((resolve, reject) => {


        UsersModel.findOne({
            $or: [
                { userName: user.userName },
                { email: user.email },
                { userId: user.userId }],
        }, (err, user) => {


            if (err) reject(err);



            if (user) return resolve(user);

            return resolve(false);

        });

    })
}

/**
 * check the user credential against the db record.
 * @method
 * 
 *@param {Object} user the user object
 * 
* @returns {Promise} Promise.resolve(user) the user object if exist or false if the user is null
* @returns {Promise} Promise.reject() on general error or if the user is not exist
* */
export const login = (user) => {


    return new Promise((resolve, reject) => {

        UsersModel.findOne({
            $or: [{ userName: user.userName }, { email: user.email }]
        }, (err, usr) => {

            if (err) reject({ code: 500, message: "server under maintenances" });

            if (usr) {


                bcrypt.compare(user.password, usr.password, function (err, result) {

                    if (err) reject({ code: 500, message: "server under maintenances" });

                    if (result) {


                        if (!usr.active) reject({ code: 403, message: "Your account is banned, please contact the website admin." })

                        resolve(usr.userId);
                    } else {

                        reject({ message: "email or password are incorrect!", code: 401 })
                    }
                });

            } else {

                reject({ message: "the user is not exist", code: 401 })
            }
        })


    })
}

export default setDBSchema();