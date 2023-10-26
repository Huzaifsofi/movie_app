const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    post: [{ 
        type: Schema.Types.ObjectId,
        ref: "Post"
    }] 
})

const User = mongoose.model('User', userSchema)

module.exports = User