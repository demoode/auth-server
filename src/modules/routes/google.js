/**
 * contain all google signup and login routes
 * ### Usage:
 *```
 * import express from 'express'
 * import pass from 'passport';
 * import { router as googleRouter } from './modules/routes/google.js'
 * let app = express();
 * app.use(googleRouter(passport));
 * ```
 * @author Moaaz Nashawi
 * 
 * @module Routes GoogleSignSystem
 */
'use strict'
import dotenv from 'dotenv'; dotenv.config();
import express from 'express'


import { checkIfUserExists, addUser } from '../../modules/mongodb/users.js';

import { v4 as uuidv4 } from 'uuid';

import { addToken } from '../../modules/mongodb/tokens.js';
import { generateToken } from '../configurations/jwt-generator.js'
import { createDateDaysIncreased } from '../configurations/mzh-tools.js';

/**
 * set the google signing & callback route
 * @method
 * @param {Object} passport 
 * @returns {Object} express router object
 */
export const router = (passport) => {
    const router = express.Router()

    router.get('/auth/google', (req, res, next) => {
        //check if the referer header exist
        // and check if the referer url is on the allowed list
        //if yes authenticate 
        //if no output 400 bad request
        if (req.headers.referer && process.env.ALLOWED_SOCIAL_LOGIN_REDIRECT_LIST.includes(req.headers.referer)) {
            passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'], state: req.headers.referer })(req, res, next);

        } else {
            res.status(400).send("bad request")
        }
    });


    router.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {

            const uuidFiller = uuidv4()
            const { displayName, id, provider } = req.user;
            //check if the user exist in db
            checkIfUserExists({ userId: id })
                //if no add the user to the db
                //if yes >> next step
                .then((user) => (!user) ? addUser({ displayName, userId: id, provider, userName: uuidFiller, email: uuidFiller, active: true }) : Promise.resolve(user))
                //add token to the db 
                .then((user) => addToken(user.userId, generateToken(user.userId, process.env.REFRESH_TOKEN_SECRET), createDateDaysIncreased(365), true))
                //req.query.state hold the referer url 
                //check if the state is not null and redirect 
                // to the url with the new refresh token
                .then(token => (req.query.state) ? res.redirect(req.query.state + "?rt=" + token.token) : Promise.resolve(token))
                //output the new refresh and access token
                .then(token => (token) ? res.json({ access_token: generateToken(token.userId, process.env.ACCESS_TOKEN_SECRET), refresh_token: token.token }) : "")
                // catch all steps errors
                .catch((err) => res.status(err.code).json({ message: err.message }))

        });

    return router

}