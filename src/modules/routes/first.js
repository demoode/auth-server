'use strict'
import express from 'express'

export const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route


router.get('/', function (req, res) {
    res.send("<p>Welcome! </p><a href='/auth/facebook?redurl=http://localhost:3000/cb'>Facebook</a> <a href='/auth/google?redurl=http://localhost:3000/cb'>Google</a>");

})

//export default router;
