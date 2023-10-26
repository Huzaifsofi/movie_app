const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    photo: {type: String},
    runtime: {type: String, required: true},
    description: {type: String, required: true},
    trailer: {type: String, required: true},
    posts: [
        { 
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie