const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const postSchema = new mongoose.Schema({
    name: {type: String},
    reating: {type: Number},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    username: {
        type: String,
    },
    movieid: { 
        type: Schema.Types.ObjectId,
        ref: "Movie"
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post