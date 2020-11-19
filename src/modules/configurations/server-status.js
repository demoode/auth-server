/**
 * contain methods to control server suspension on connection errors
 * @author Moaaz Nashawi
 * 
 * @module Server ServerStatus
 */
import mongoose from 'mongoose'

/**
 * check if the db connection is connected 
 * @method
 * @returns {Promise} Promise.resolve() if the db is online
 * @returns {Promise} Promise.reject({ code: 500, message: "server under maintainance please try again later." }) if the db is offline
 */
export const isServerOn = () => {

    return new Promise((resolve, reject) => {

        if (mongoose.connection.readyState == 1) resolve()

        reject({ code: 500, message: "server under maintainance please try again later." })

    })

}