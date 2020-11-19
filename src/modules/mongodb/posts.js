'use strict';
import mongoose from 'mongoose';



let PostModel;
let postSchema;



const setDBModel = () => {
    //console.log("set db")
    postSchema = new mongoose.Schema({
        title: String,
        text: String,
        userId: String

    });
    PostModel = mongoose.model('posts', postSchema);


}

export const addPost = (post) => {
    return new Promise((resolve, reject) => {
        //UsersModel = setDBModel(mongoose);



        const tkn = new PostModel(post);
        tkn.save(function (err, doc) {

            if (err) { reject({ ...err, code: 500 }) } else { resolve(doc); }

        });


    })
}


export const getPosts = (userId) => {

    return new Promise((resolve, reject) => {


        PostModel.find({
            userId
        }, (err, docs) => {

            if (err) reject(err);

            if (docs) { resolve(docs) } else { reject(reject({ message: "token is not valid ", code: 403 })) }
        })
    })


}

export default setDBModel();