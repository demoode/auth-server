/**
 * contain all the local signup and login & tokens routes
 * ### Usage:
 *```
 * import express from 'express'
 * import pass from 'passport';
 * import { router as facebookRouter } from './modules/routes/facebook.js'
 * let app = express();
 * app.use(facebookRouter(passport));
 * ```
 * @author Moaaz Nashawi
 * 
 * @module Routes LocalSignSystem
 */
'use strict'

import dotenv from 'dotenv'; dotenv.config()
import express from 'express'


import { checkIfUserExists, addUser, login, checkIfUserActive } from '../mongodb/users.js';
import { v4 as uuidv4 } from 'uuid';
import { addToken, removeByToken, checkTokenValidity } from '../mongodb/tokens.js';
import { generateToken, verifyToken } from '../configurations/jwt-generator.js'
import { createDateDaysIncreased } from '../configurations/mzh-tools.js';



/**
 * set the local signing & callback & token route
 * @method
 * @param {Object} passport 
 * @returns {Object} express router object
 */
export const router = () => {

    const router = express.Router()



    router.post('/signup', (req, res) => {

        //check if user exist 
        checkIfUserExists(req.body)
            //if not exist resolve, if exist reject
            .then((user) => (user) ? Promise.reject({ code: 401, message: "user exist" }) : Promise.resolve(user))
            //add user to db
            .then(() => addUser({ ...req.body, userId: uuidv4() }))
            // output success message
            .then(() => res.json({ message: "User created" }))
            // catch all errors of the previous steps if existed
            .catch(err => res.status(err.code).json({ message: err.message }))
    })


    router.post('/login', (req, res) => {
        //try to login using provided credentials
        login(req.body)
            // if login success add new refresh token to the db
            .then((userId) => addToken(userId, generateToken(userId, process.env.REFRESH_TOKEN_SECRET), createDateDaysIncreased(365), true))
            //output the new refresh token and access token
            .then((token) => res.json({ access_token: generateToken(token.userId, process.env.ACCESS_TOKEN_SECRET), refresh_token: token.token }))
            // catch all errors of the previous steps if existed
            .catch((err) => res.status(err.code).json({ message: err.message }))
    })



    router.post('/signout', (req, res) => {
        // remove the refresh token from the db
        removeByToken(req.body.refresh_token)
            //output empty refresh and access token json object
            .then(res.json({ access_token: "", refresh_token: "" }))
            // catch all errors of the previous steps if existed
            .catch((err) => res.status(err.code).json({ message: err.message }))

    })



    router.post('/checktoken', (req, res) => {

        //check if the token is valid or not or is expired
        verifyToken(req.body.access_token, process.env.ACCESS_TOKEN_SECRET)
            //show success message
            .then(() => res.json({ message: "token is valid" }))
            // catch all errors of the previous steps if existed
            .catch((err) => res.status(err.code).json(err.message))

    })


    router.post('/newtoken', (req, res) => {

        //check if the token is valid or not or is expired
        verifyToken(req.body.refresh_token, process.env.REFRESH_TOKEN_SECRET)
            // check if the token valid in the db or banned
            .then(() => checkTokenValidity(req.body.refresh_token))
            //check if the user is active in the db or banned
            .then(token => checkIfUserActive(token.userId))
            //output the refresh and access token 
            .then((user) => res.json({ access_token: generateToken(user.userId, process.env.ACCESS_TOKEN_SECRET), refresh_token: req.body.refresh_token }))
            // catch all errors of the previous steps if existed
            .catch((err) => res.status(err.code).json(err.message))



    })




    return router;
}