import mongoose from "mongoose";

const chatUser = new mongoose.Schema({
    //title: String, // String is shorthand for {type: String}
    author: String,
    message: String
    //body: String,
    //comments: [{ body: String, date: Date }],
    //date: { type: Date, default: Date.now },
    //hidden: Boolean,
    /* meta: {
        votes: Number,
        favs: Number
    } */
});

export const schemaUser =mongoose.model("ChatUser",chatUser)