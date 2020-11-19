'use strict';
import dotenv from 'dotenv'; dotenv.config();
/**
 * @file index.js is the root file for this example app
 * @author Moaaz Nashawi
 * 
 */



import express from 'express';


import { serverOnMiddleWear } from './modules/configurations/custom-middleware.js'


import { runHttpsServer } from './modules/configurations/https-server.js'

import { dbInitialConnects } from './modules/mongodb/connect.js';

import bodyParser from 'body-parser'

import pass from 'passport';
import passConfig from './modules/passport/passport.js'
import facebook from './modules/passport/facebook.js';
import google from './modules/passport/google.js'

import cors from 'cors';
import corsOptions from './modules/configurations/cors.js';

import { router as facebookRouter } from './modules/routes/facebook.js'
import { router as googleRouter } from './modules/routes/google.js'
import { router as signingRouter } from './modules/routes/signing.js'



let app = express();


// initial connection to db
await dbInitialConnects(process.env.MONGO_CONNECTION_STRING);

// cors configs
app.use(cors(corsOptions(process.env.ALLOWED_URL_LIST)))

// this middleware check if there is a problem with db 
// connection and banned the whole server with code 500
app.use(serverOnMiddleWear)

// passport configs.
let passport = passConfig(pass);

// support json encoded bodies
app.use(bodyParser.json());

// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


// passport initialize
app.use(passport.initialize());

// passport session initialize
app.use(passport.session());

// facebook passport strategy configs.
facebook(passport, process.env.FACEBOOK_APP_ID, process.env.FACEBOOK_APP_SECRET, process.env.FACEBOOK_CALLBACK_URL)

// google passport strategy configs.
google(passport, process.env.GOOGLE_CONSUMER_KEY, process.env.GOOGLE_CONSUMER_SECRET, process.env.GOOGLE_CALLBACK_URL);


/// routers
app.use(process.env.API_RELEASED_VERSION_URL, facebookRouter(passport));
app.use(process.env.API_RELEASED_VERSION_URL, googleRouter(passport));
app.use(process.env.API_RELEASED_VERSION_URL, signingRouter());
///

// run http and https servers
runHttpsServer(app, process.env.HTTPS_SERVER_PORT, process.env.HTTPS_SERVER_KEY, process.env.HTTPS_SERVER_CERT)
app.listen(process.env.HTTP_SERVER_PORT);