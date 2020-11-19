import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
/**
 * contain the connection method to mongodb
 * @author Moaaz Nashawi
 * 
 * @module MongoDb ConnectTo
 */

/**
 * initialize the connection to mongodb
 * @method
 * @param {String} connectionString
 */
export const dbInitialConnects = async (connectionString) => {


    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    //  .catch(err => console.error(err.message))




};


