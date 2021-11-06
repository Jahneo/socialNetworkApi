const { Schema, model } = require('mongoose');


// thoughts Schema
const ThoughtSchema = new Schema( {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get:(createdAt) => moment(createdAt).format('MM DD YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        trim: true,
        required: "Username is required"
    },
})
//create Thought
const Thought = model ('Thought', ThoughtSchema);
//export Thought model
module.exports = Thought;